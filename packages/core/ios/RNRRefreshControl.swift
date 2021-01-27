class RNRRefreshControl: UIView, RNRChild, RNRRefreshControlProtocol {
    var parent: RNRParent?
    var refreshControl: UIRefreshControl?

    var isReady = false

    @objc var refreshing: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var refreshControlTintColor: NSNumber? = nil
    @objc var title: NSString? = nil
    @objc var titleColor: NSNumber? = nil
    @objc var onRefresh: RCTDirectEventBlock?

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview != nil {
            parent = (newSuperview as! RNRParent)
            isReady = true

            if !parent!.isReady {
                setupParent(parent!)
            } else {
                updateInParent(parent!, subview: self)
            }
        }
    }

    func setup() {
        if parent != nil && refreshControl != nil {
            let childrenReady = areChildrenReady(subviews)
            if childrenReady {
                refreshControl!.addTarget(self, action: #selector(self.refresh(_:)), for: .valueChanged)

                if refreshControlTintColor != nil {
                    refreshControl!.tintColor = RCTConvert.uiColor(refreshControlTintColor!)
                }

                updateTitle()

                if refreshing == 1 {
                    refreshControl!.beginRefreshing()
                }
            }
        }
    }

    func updateTitle() {
        if title != nil {
            let attributedTitle = NSMutableAttributedString(string: title! as String)
            let range = title!.range(of: title! as String)
            if titleColor != nil {
                attributedTitle.addAttribute(NSAttributedString.Key.foregroundColor, value: RCTConvert.uiColor(titleColor!) as Any, range: range)
            }
            refreshControl?.attributedTitle = attributedTitle
        } else {
            refreshControl?.attributedTitle = nil
        }
    }

    @objc func refresh(_ sender: AnyObject) {
        if onRefresh != nil {
            onRefresh!([:])
        }
    }

    override func didSetProps(_ changedProps: [String]!) {
        if parent != nil {
            changedProps.forEach({ key in
                if key == "title" || key == "titleColor" {
                    updateTitle()
                } else if key == "refreshing" {
                    if refreshing == 1 {
                        refreshControl?.beginRefreshing()
                    } else {
                        refreshControl?.endRefreshing()
                    }
                } else if key == "refreshControlTintColor" {
                    refreshControl?.tintColor = RCTConvert.uiColor(refreshControlTintColor)
                }
            })
            updateInParent(parent!, subview: self)
        }
    }

    func getRefreshControl() -> UIRefreshControl? {
        refreshControl
    }

    func createRefreshControl() -> UIRefreshControl {
        refreshControl = UIRefreshControl()
        setup()
        return refreshControl!
    }
}
