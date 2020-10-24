public func areChildrenReady(_ subviews: [UIView]) -> Bool {
    var ready = true
    subviews.forEach { subview in
        if subview is RNRChild {
            if !(subview as! RNRChild).isReady {
                ready = false
            }
        } else if !subview.subviews.isEmpty {
            let result = areChildrenReady(subview.subviews)
            if result == false {
                ready = false
            }
        }
    }
    return ready
}

public func isParentReady(_ superview: UIView) -> Bool {
    if superview is RNRParent {
        return true
    } else if superview.superview != nil {
        return isParentReady(superview.superview!)
    }
    return false
}

public func setupParent(_ superview: UIView) {
    if superview is RNRParent {
        (superview as! RNRParent).setup()
    } else if superview.superview != nil {
        setupParent(superview.superview!)
    }
}

public func updateInParent(_ superview: UIView, subview: UIView) {
    if superview is RNRParent {
        (superview as! RNRParent).updateSubview(subview)
    } else if superview.superview != nil {
        updateInParent(superview.superview!, subview: superview)
    }
}

public func getSubview(_ subview: UIView) -> UIView? {
    if subview is RNRChild {
        return subview
    } else if !subview.subviews.isEmpty {
        var match: UIView?
        subview.subviews.forEach { subview in
            let result = getSubview(subview)
            if result != nil {
                match = result
            }
        }
        return match
    }
    return nil
}
