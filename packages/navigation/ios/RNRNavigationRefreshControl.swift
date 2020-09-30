class RNRNavigationRefreshControl: UIView {
    var scene: RNRNavigationScene?
    var refreshControl: UIRefreshControl = UIRefreshControl()

    var initialized = false

    @objc var refreshing: Bool = false
    @objc var refreshControlTintColor: UIColor? = nil
    @objc var title: NSString? = nil
    @objc var titleColor: UIColor? = nil

    @objc var onRefresh: RCTDirectEventBlock?

    func setup() {
        let scrollView = scene!.findScrollView()

        if !initialized && scrollView != nil {
            initialized = true

            refreshControl.addTarget(self, action: #selector(self.refresh(_:)), for: .valueChanged)

            if refreshControlTintColor != nil {
                refreshControl.tintColor = refreshControlTintColor!
            }

            updateTitle()

            if refreshing == true {
                refreshControl.beginRefreshing()
            }

            if #available(iOS 10.0, *) {
                scrollView!.refreshControl = refreshControl
            }
        }
    }

    @objc func refresh(_ sender: AnyObject) {
        if onRefresh != nil {
            onRefresh!([:])
        }
    }

    @objc
    override func didSetProps(_ changedProps: [String]!) {
        changedProps.forEach({ key in
            if key == "title" || key == "titleColor" {
                updateTitle()
            } else if key == "refreshing" {
                if refreshing == true {
                    refreshControl.beginRefreshing()
                } else {
                    refreshControl.endRefreshing()
                }
            } else if key == "refreshControlTintColor" {
                refreshControl.tintColor = refreshControlTintColor
            }
        })
    }

    func updateTitle() {
        if title != nil {
            let attributedTitle = NSMutableAttributedString(string: title! as String)
            let range = title!.range(of: title! as String)
            if titleColor != nil {
                attributedTitle.addAttribute(NSAttributedString.Key.foregroundColor, value: titleColor!, range: range)
            }
            refreshControl.attributedTitle = attributedTitle
        } else {
            refreshControl.attributedTitle = nil
        }
    }
}
