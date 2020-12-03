@available(macCatalyst 13.0, *)
class RNRConstraintsView: UIView {
    var uiManager: RCTUIManager?

    var prevConstraints: [NSLayoutConstraint]?

    @objc var _preservesSuperviewLayoutMargins: Bool = false
    @objc var _constraints: NSArray?
    @objc var _animateChangesOptions: NSDictionary?

    override func reactSetFrame(_ frame: CGRect) {
        // Don't use this one, we do that through constraints
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        if superview != nil {
            self.translatesAutoresizingMaskIntoConstraints = false
            self.preservesSuperviewLayoutMargins = _preservesSuperviewLayoutMargins
            applyConstraints()
        }
    }

    override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
        var match: UIView? = nil
        if reactSubviews() != nil {
            reactSubviews().forEach { view in
                let res = view.hitTest(point, with: event)
                if res != nil {
                    match = res
                }
            }
            if match != nil {
                return match
            }
        }
        return super.hitTest(_: point, with: event)
    }

    override func layoutSubviews() {
        uiManager?.setSize(frame.size, for: self)
        super.layoutSubviews()
    }

    override func didSetProps(_ changedProps: [String]!) {
        super.didSetProps(changedProps)
        if changedProps.first(where: { $0 == "_preservesSuperviewLayoutMargins" }) != nil {
            self.preservesSuperviewLayoutMargins = _preservesSuperviewLayoutMargins
        }
        applyConstraints()
    }

    func getValue(_ value: NSDictionary) -> CGFloat? {
        let item: String? = value["item"] != nil ? RCTConvert.nsString(value["item"]) : nil
        let property: String? = value["property"] != nil ? RCTConvert.nsString(value["property"]) : nil
        let attribute: String? = value["attribute"] != nil ? RCTConvert.nsString(value["attribute"]) : nil

        var view: UIView?
        switch item {
        case "window":
            view = UIApplication.shared.windows.first
            break
        case "view":
            view = self
            break
        case "superview":
            view = superview
            break
        default: break
        }

        if view != nil {
            var edgeInsets: UIEdgeInsets?
            switch property {
            case "dimensions":
                if attribute == "width" {
                    return view!.frame.width
                } else if attribute == "height" {
                    return view!.frame.height
                }
                break
            case "margin":
                edgeInsets = view!.layoutMargins
                break
            case "safeArea":
                if #available(iOS 11.0, *) {
                    edgeInsets = view!.safeAreaInsets
                }
                break
            default: break
            }

            if edgeInsets != nil {
                switch attribute {
                case "top":
                    return edgeInsets!.top
                case "left":
                    return edgeInsets!.left
                case "bottom":
                    return edgeInsets!.bottom
                case "right":
                    return edgeInsets!.right
                default: break
                }
            }
        }

        return nil
    }

    func processMathOperation(_ value: Any?) -> CGFloat? {
        if value == nil {
            return nil
        } else if value is CGFloat || value is NSNumber || value is Int || value is Float {
            return RCTConvert.cgFloat(value)
        } else if value is NSDictionary {
            if (value as! NSDictionary)["item"] != nil {
                return getValue(RCTConvert.nsDictionary(value) as NSDictionary)
            } else {
                let operation: String? = (value as! NSDictionary)["operation"] != nil ? RCTConvert.nsString((value as! NSDictionary)["operation"]) : nil
                let values: [Any]? = (value as! NSDictionary)["values"] != nil ? RCTConvert.nsArray((value as! NSDictionary)["values"]) : nil
                if operation != nil {
                    return mathOperation(operation!, values)
                }
            }
        }
        return nil
    }

    func mathOperation(_ operation: String, _ values: [Any]?) -> CGFloat? {
        if values == nil {
            return nil
        }
        var result: CGFloat?
        values?.forEach { value in
            let i = processMathOperation(value)
            if i != nil {
                if result == nil {
                    result = i!
                } else {
                    switch operation {
                    case "add":
                        result! += i!
                        break
                    case "mul":
                        result! *= i!
                        break
                    case "div":
                        result! /= i!
                        break
                    case "sub":
                        result! -= i!
                        break
                    default: break
                    }
                }
            }
        }
        return result != nil ? result : 0
    }

    func getType(_ attribute: String) -> String? {
        if attribute == "leading" ||
                   attribute == "trailing" ||
                   attribute == "left" ||
                   attribute == "right" ||
                   attribute == "centerX" ||
                   attribute == "leadingMargin" ||
                   attribute == "trailingMargin" ||
                   attribute == "centerXWithinMargins" ||
                   attribute == "leftMargin" ||
                   attribute == "rightMargin" {
            return "x"
        } else if attribute == "top" ||
                   attribute == "bottom" ||
                   attribute == "centerY" ||
                   attribute == "firstBaseline" ||
                   attribute == "lastBaseline" ||
                   attribute == "topMargin" ||
                   attribute == "bottomMargin" ||
                   attribute == "centerYWithinMargins" {
            return "y"
        } else if attribute == "width" || attribute == "height" {
            return "dimension"
        }
        return nil
    }

    func getXAnchorFromView(_ view: UIView, attribute: String) -> NSLayoutXAxisAnchor? {
        if attribute == "leading" {
            return view.leadingAnchor
        } else if attribute == "trailing" {
            return view.trailingAnchor
        } else if attribute == "left" {
            return view.leftAnchor
        } else if attribute == "right" {
            return view.rightAnchor
        } else if attribute == "centerX" {
            return view.centerXAnchor
        } else if attribute == "leadingMargin" {
            return view.layoutMarginsGuide.leadingAnchor
        } else if attribute == "trailingMargin" {
            return view.layoutMarginsGuide.trailingAnchor
        } else if attribute == "centerXWithinMargins" {
            return view.layoutMarginsGuide.centerXAnchor
        } else if attribute == "leftMargin" {
            return view.layoutMarginsGuide.leftAnchor
        } else if attribute == "rightMargin" {
            return view.layoutMarginsGuide.rightAnchor
        }
        return nil
    }

    func getXAnchorFromSafeArea(_ safeAreaLayoutGuide: UILayoutGuide, attribute: String) -> NSLayoutXAxisAnchor? {
        if attribute == "left" {
            return safeAreaLayoutGuide.leftAnchor
        } else if attribute == "right" {
            return safeAreaLayoutGuide.rightAnchor
        } else if attribute == "leading" {
            return safeAreaLayoutGuide.leadingAnchor
        } else if attribute == "centerX" {
            return safeAreaLayoutGuide.centerXAnchor
        } else if attribute == "trailing" {
            return safeAreaLayoutGuide.trailingAnchor
        }
        return nil
    }

    func getYAnchorFromView(_ view: UIView, attribute: String) -> NSLayoutYAxisAnchor? {
        if attribute == "top" {
            return view.topAnchor
        } else if attribute == "bottom" {
            return view.bottomAnchor
        } else if attribute == "centerY" {
            return view.centerYAnchor
        } else if attribute == "firstBaseline" {
            return view.firstBaselineAnchor
        } else if attribute == "lastBaseline" {
            return view.lastBaselineAnchor
        } else if attribute == "topMargin" {
            return view.layoutMarginsGuide.topAnchor
        } else if attribute == "bottomMargin" {
            return view.layoutMarginsGuide.bottomAnchor
        } else if attribute == "centerYWithinMargins" {
            return view.layoutMarginsGuide.centerYAnchor
        }
        return nil
    }

    func getYAnchorFromSafeArea(_ safeAreaLayoutGuide: UILayoutGuide, attribute: String) -> NSLayoutYAxisAnchor? {
        if attribute == "top" {
            return safeAreaLayoutGuide.topAnchor
        } else if attribute == "centerY" {
            return safeAreaLayoutGuide.centerYAnchor
        } else if attribute == "lastBaseline" {
            return safeAreaLayoutGuide.bottomAnchor
        } else if attribute == "bottom" {
            return safeAreaLayoutGuide.bottomAnchor
        }
        return nil
    }

    func createXConstraint(_ params: NSDictionary) -> NSLayoutConstraint? {
        let item: String? = params["item"] != nil ? RCTConvert.nsString(params["item"]) : nil
        let attribute: String? = params["attribute"] != nil ? RCTConvert.nsString(params["attribute"]) : nil
        let relatedBy: String? = params["relatedBy"] != nil ? RCTConvert.nsString(params["relatedBy"]) : nil
        let toAttribute: String? = params["toAttribute"] != nil ? RCTConvert.nsString(params["toAttribute"]) : nil
        let toItem: String? = params["toItem"] != nil ? RCTConvert.nsString(params["toItem"]) : nil
        let constant: CGFloat? = processMathOperation(params["constant"])
        let multiplier: CGFloat? = processMathOperation(params["multiplier"])

        if item != nil && attribute != nil && relatedBy != nil && toAttribute != nil && toItem != nil {
            var itemAnchor: NSLayoutXAxisAnchor? = nil
            if item == "view" {
                itemAnchor = getXAnchorFromView(self, attribute: attribute!)
            } else if item == "superview" {
                itemAnchor = getXAnchorFromView(superview!, attribute: attribute!)
            } else if item == "safeArea" {
                if #available(iOS 11.0, *) {
                    itemAnchor = getXAnchorFromSafeArea(superview!.safeAreaLayoutGuide, attribute: attribute!)
                }
            }

            var toItemAnchor: NSLayoutXAxisAnchor? = nil
            if toItem == "view" {
                toItemAnchor = getXAnchorFromView(self, attribute: toAttribute!)
            } else if toItem == "superview" {
                toItemAnchor = getXAnchorFromView(superview!, attribute: toAttribute!)
            } else if toItem == "safeArea" {
                if #available(iOS 11.0, *) {
                    toItemAnchor = getXAnchorFromSafeArea(superview!.safeAreaLayoutGuide, attribute: toAttribute!)
                }
            }

            if itemAnchor != nil && toItemAnchor != nil {
                if relatedBy == "equalTo" {
                    if constant != nil {
                        return itemAnchor!.constraint(equalTo: toItemAnchor!, constant: constant!)
                    } else {
                        return itemAnchor!.constraint(equalTo: toItemAnchor!)
                    }
                } else if relatedBy == "greaterThenOrEqualTo" {
                    if constant != nil {
                        return itemAnchor!.constraint(greaterThanOrEqualTo: toItemAnchor!, constant: constant!)
                    } else {
                        return itemAnchor!.constraint(greaterThanOrEqualTo: toItemAnchor!)
                    }
                } else if relatedBy == "lessThanOrEqualTo" {
                    if constant != nil {
                        return itemAnchor!.constraint(lessThanOrEqualTo: toItemAnchor!, constant: constant!)
                    } else {
                        return itemAnchor!.constraint(lessThanOrEqualTo: toItemAnchor!)
                    }
                } else if relatedBy == "equalToSystemSpacingAfter" && multiplier != nil {
                    if #available(iOS 11.0, *) {
                        return itemAnchor!.constraint(equalToSystemSpacingAfter: toItemAnchor!, multiplier: multiplier!)
                    }
                } else if relatedBy == "greaterThanOrEqualToSystemSpacingAfter" && multiplier != nil {
                    if #available(iOS 11.0, *) {
                        return itemAnchor!.constraint(greaterThanOrEqualToSystemSpacingAfter: toItemAnchor!, multiplier: multiplier!)
                    }
                } else if relatedBy == "lessThanOrEqualToSystemSpacingAfter" && multiplier != nil {
                    if #available(iOS 11.0, *) {
                        return itemAnchor!.constraint(lessThanOrEqualToSystemSpacingAfter: toItemAnchor!, multiplier: multiplier!)
                    }
                }
            }
        }
        return nil
    }

    func createYConstraint(_ params: NSDictionary) -> NSLayoutConstraint? {
        let item: String? = params["item"] != nil ? RCTConvert.nsString(params["item"]) : nil
        let attribute: String? = params["attribute"] != nil ? RCTConvert.nsString(params["attribute"]) : nil
        let relatedBy: String? = params["relatedBy"] != nil ? RCTConvert.nsString(params["relatedBy"]) : nil
        let toAttribute: String? = params["toAttribute"] != nil ? RCTConvert.nsString(params["toAttribute"]) : nil
        let toItem: String? = params["toItem"] != nil ? RCTConvert.nsString(params["toItem"]) : nil
        let constant: CGFloat? = processMathOperation(params["constant"])
        let multiplier: CGFloat? = processMathOperation(params["multiplier"])

        if item != nil && attribute != nil && relatedBy != nil && toAttribute != nil && toItem != nil {
            var itemAnchor: NSLayoutYAxisAnchor? = nil
            if item == "view" {
                itemAnchor = getYAnchorFromView(self, attribute: attribute!)
            } else if item == "superview" {
                itemAnchor = getYAnchorFromView(superview!, attribute: attribute!)
            } else if item == "safeArea" {
                if #available(iOS 11.0, *) {
                    itemAnchor = getYAnchorFromSafeArea(superview!.safeAreaLayoutGuide, attribute: attribute!)
                }
            }

            var toItemAnchor: NSLayoutYAxisAnchor? = nil
            if toItem == "view" {
                toItemAnchor = getYAnchorFromView(self, attribute: toAttribute!)
            } else if toItem == "superview" {
                toItemAnchor = getYAnchorFromView(superview!, attribute: toAttribute!)
            } else if toItem == "safeArea" {
                if #available(iOS 11.0, *) {
                    toItemAnchor = getYAnchorFromSafeArea(superview!.safeAreaLayoutGuide, attribute: toAttribute!)
                }
            }

            if itemAnchor != nil && toItemAnchor != nil {
                if relatedBy == "equalTo" {
                    if constant != nil {
                        return itemAnchor!.constraint(equalTo: toItemAnchor!, constant: constant!)
                    } else {
                        return itemAnchor!.constraint(equalTo: toItemAnchor!)
                    }
                } else if relatedBy == "greaterThenOrEqualTo" {
                    if constant != nil {
                        return itemAnchor!.constraint(greaterThanOrEqualTo: toItemAnchor!, constant: constant!)
                    } else {
                        return itemAnchor!.constraint(greaterThanOrEqualTo: toItemAnchor!)
                    }
                } else if relatedBy == "lessThanOrEqualTo" {
                    if constant != nil {
                        return itemAnchor!.constraint(lessThanOrEqualTo: toItemAnchor!, constant: constant!)
                    } else {
                        return itemAnchor!.constraint(lessThanOrEqualTo: toItemAnchor!)
                    }
                } else if relatedBy == "equalToSystemSpacingBelow" && multiplier != nil {
                    if #available(iOS 11.0, *) {
                        return itemAnchor!.constraint(equalToSystemSpacingBelow: toItemAnchor!, multiplier: multiplier!)
                    }
                } else if relatedBy == "greaterThanOrEqualToSystemSpacingBelow" && multiplier != nil {
                    if #available(iOS 11.0, *) {
                        return itemAnchor!.constraint(greaterThanOrEqualToSystemSpacingBelow: toItemAnchor!, multiplier: multiplier!)
                    }
                } else if relatedBy == "lessThanOrEqualToSystemSpacingBelow" && multiplier != nil {
                    if #available(iOS 11.0, *) {
                        return itemAnchor!.constraint(lessThanOrEqualToSystemSpacingBelow: toItemAnchor!, multiplier: multiplier!)
                    }
                }
            }
        }
        return nil
    }

    func createDimensionConstraint(_ params: NSDictionary) -> NSLayoutConstraint? {
        let item: String? = params["item"] != nil ? RCTConvert.nsString(params["item"]) : nil
        let attribute: String? = params["attribute"] != nil ? RCTConvert.nsString(params["attribute"]) : nil
        let relatedBy: String? = params["relatedBy"] != nil ? RCTConvert.nsString(params["relatedBy"]) : nil
        let toAttribute: String? = params["toAttribute"] != nil ? RCTConvert.nsString(params["toAttribute"]) : nil
        let toItem: String? = params["toItem"] != nil ? RCTConvert.nsString(params["toItem"]) : nil
        let constant: CGFloat? = processMathOperation(params["constant"])
        let multiplier: CGFloat? = processMathOperation(params["multiplier"])

        if item != nil && attribute != nil && relatedBy != nil {
            var itemAnchor: NSLayoutDimension? = nil
            if item == "view" {
                if attribute == "width" {
                    itemAnchor = self.widthAnchor
                } else if attribute == "height" {
                    itemAnchor = self.heightAnchor
                }
            } else if item == "superview" {
                if attribute == "width" {
                    itemAnchor = superview!.widthAnchor
                } else if attribute == "height" {
                    itemAnchor = superview!.heightAnchor
                }
            }

            var toItemAnchor: NSLayoutDimension? = nil
            if toItem == "view" {
                if toAttribute == "width" {
                    toItemAnchor = self.widthAnchor
                } else if toAttribute == "height" {
                    toItemAnchor = self.heightAnchor
                }
            } else if toItem == "superview" {
                if toAttribute == "width" {
                    toItemAnchor = superview!.widthAnchor
                } else if toAttribute == "height" {
                    toItemAnchor = superview!.heightAnchor
                }
            }

            if itemAnchor != nil && toItemAnchor != nil {
                if relatedBy == "equalTo" {
                    if constant != nil && multiplier != nil {
                        return itemAnchor!.constraint(equalTo: toItemAnchor!, multiplier: multiplier!, constant: constant!)
                    } else if multiplier != nil {
                        return itemAnchor!.constraint(equalTo: toItemAnchor!, multiplier: multiplier!)
                    } else if constant != nil {
                        return itemAnchor!.constraint(equalTo: toItemAnchor!, constant: constant!)
                    } else {
                        return itemAnchor!.constraint(equalTo: toItemAnchor!)
                    }
                } else if relatedBy == "greaterThenOrEqualTo" {
                    if constant != nil && multiplier != nil {
                        return itemAnchor!.constraint(greaterThanOrEqualTo: toItemAnchor!, multiplier: multiplier!, constant: constant!)
                    } else if multiplier != nil {
                        return itemAnchor!.constraint(greaterThanOrEqualTo: toItemAnchor!, multiplier: multiplier!)
                    } else if constant != nil {
                        return itemAnchor!.constraint(greaterThanOrEqualTo: toItemAnchor!, constant: constant!)
                    } else {
                        return itemAnchor!.constraint(greaterThanOrEqualTo: toItemAnchor!)
                    }
                } else if relatedBy == "lessThanOrEqualTo" {
                    if constant != nil && multiplier != nil {
                        return itemAnchor!.constraint(lessThanOrEqualTo: toItemAnchor!, multiplier: multiplier!, constant: constant!)
                    } else if multiplier != nil {
                        return itemAnchor!.constraint(lessThanOrEqualTo: toItemAnchor!, multiplier: multiplier!)
                    } else if constant != nil {
                        return itemAnchor!.constraint(lessThanOrEqualTo: toItemAnchor!, constant: constant!)
                    } else {
                        return itemAnchor!.constraint(lessThanOrEqualTo: toItemAnchor!)
                    }
                }
            } else if itemAnchor != nil && constant != nil {
                if relatedBy == "equalTo" {
                    return itemAnchor!.constraint(equalToConstant: constant!)
                } else if relatedBy == "greaterThenOrEqualTo" {
                    return itemAnchor!.constraint(greaterThanOrEqualToConstant: constant!)
                } else if relatedBy == "lessThanOrEqualTo" {
                    return itemAnchor!.constraint(lessThanOrEqualToConstant: constant!)
                }
            }
        }

        return nil
    }

    func applyConstraints() {
        if superview != nil {
            var constraints: [NSLayoutConstraint] = []

            _constraints?.forEach { constraint in
                let params: NSDictionary? = RCTConvert.nsDictionary(constraint) as NSDictionary?
                if params != nil {
                    let type: String? = params!["attribute"] != nil ? getType(RCTConvert.nsString(params!["attribute"])) : nil
                    if type == "x" {
                        let constraint = createXConstraint(params!)
                        if constraint != nil {
                            constraints.append(constraint!)
                        }
                    } else if type == "y" {
                        let constraint = createYConstraint(params!)
                        if constraint != nil {
                            constraints.append(constraint!)
                        }
                    } else if type == "dimension" {
                        let constraint = createDimensionConstraint(params!)
                        if constraint != nil {
                            constraints.append(constraint!)
                        }
                    }
                }
            }

            if prevConstraints != nil {
                superview!.layoutIfNeeded()
                var animated = false
                if _animateChangesOptions != nil {
                    let duration: TimeInterval? = _animateChangesOptions!["duration"] != nil ? RCTConvert.double(_animateChangesOptions!["duration"]) : nil
                    let delay: TimeInterval? = _animateChangesOptions!["delay"] != nil ? RCTConvert.double(_animateChangesOptions!["delay"]) : nil
                    var curve: UIView.AnimationOptions?
                    var damping: CGFloat?
                    var velocity: CGFloat?
                    var useCurve: Bool?

                    let nextCurve = RCTConvert.nsString(_animateChangesOptions!["delay"])
                    if nextCurve == "easeInOut" {
                        useCurve = true
                        curve = UIView.AnimationOptions.curveEaseInOut
                    } else if nextCurve == "easeIn" {
                        useCurve = true
                        curve = UIView.AnimationOptions.curveEaseIn
                    } else if nextCurve == "easeOut" {
                        useCurve = true
                        curve = UIView.AnimationOptions.curveEaseOut
                    } else if nextCurve == "linear" {
                        useCurve = true
                        curve = UIView.AnimationOptions.curveLinear
                    }
                    if useCurve != true {
                        damping = _animateChangesOptions!["delay"] != nil ? RCTConvert.cgFloat(_animateChangesOptions!["delay"]) : nil
                        velocity = _animateChangesOptions!["delay"] != nil ? RCTConvert.cgFloat(_animateChangesOptions!["delay"]) : nil
                        if velocity != nil || damping != nil {
                            useCurve = false
                        }
                    }
                    if useCurve != false {
                        useCurve = true
                    }
                    if useCurve == true && duration != nil {
                        animated = true
                        UIView.animate(
                                withDuration: duration!,
                                delay: delay ?? 0,
                                options: curve != nil ? [curve!] : [],
                                animations: { [self] in
                                    NSLayoutConstraint.deactivate(prevConstraints!)
                                    NSLayoutConstraint.activate(constraints)
                                    superview!.layoutIfNeeded()
                                    prevConstraints = constraints
                                },
                                completion: nil
                        )
                    } else if useCurve == false && duration != nil {
                        animated = true
                        UIView.animate(
                                withDuration: duration!,
                                delay: delay ?? 0,
                                usingSpringWithDamping: damping ?? 0,
                                initialSpringVelocity: velocity ?? 0,
                                options: [],
                                animations: { [self] in
                                    NSLayoutConstraint.deactivate(prevConstraints!)
                                    NSLayoutConstraint.activate(constraints)
                                    superview!.layoutIfNeeded()
                                    prevConstraints = constraints
                                },
                                completion: nil
                        )
                    }
                }
                if !animated {
                    NSLayoutConstraint.deactivate(prevConstraints!)
                    NSLayoutConstraint.activate(constraints)
                    prevConstraints = constraints
                }
            } else {
                NSLayoutConstraint.activate(constraints)
                prevConstraints = constraints
            }
        }
    }
}
