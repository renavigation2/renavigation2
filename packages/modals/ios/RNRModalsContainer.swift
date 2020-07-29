class RNRModalsContainer: UIView, UIAdaptivePresentationControllerDelegate {
    static var ready = true

    var _reactSubviews: [RNRModal] = []

    override init(frame: CGRect) {
        super.init(frame: frame)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func reactSubviews() -> [UIView] {
        _reactSubviews
    }

    override func insertReactSubview(_ subview: UIView, at: NSInteger) {
        _reactSubviews.insert(subview as! RNRModal, at: at)
    }

    override func removeReactSubview(_ subview: UIView) {
        (subview as! RNRModal).controller.view.removeFromSuperview()
        (subview as! RNRModal).controller.removeFromParent()
        self._reactSubviews.removeAll(where: { $0 == subview })
    }

    func dismiss(_ view: RNRModal) {
        view.controller.dismiss(animated: view.animated)
    }

    override func didUpdateReactSubviews() {
        for subview in _reactSubviews {
            if (!subview.presented) {
                presentPageSheet(subview: subview)
            }
        }
    }

    func presentPageSheet(subview: RNRModal) {
        if (RNRModalsContainer.ready) {
            doPresentPageSheet(subview: subview)
        } else {
            // Wait for invalidate to finish
            if #available(iOS 10.0, *) {
                Timer.scheduledTimer(withTimeInterval: 0.01, repeats: true) { timer in
                    if (RNRModalsContainer.ready) {
                        timer.invalidate()
                        self.doPresentPageSheet(subview: subview)
                    }
                }
            } else {
                doPresentPageSheet(subview: subview)
            }
        }
    }

    func doPresentPageSheet(subview: RNRModal) {
        if (self._reactSubviews.contains(subview) && !subview.presented) {
            subview.presented = true
            RCTKeyWindow()?.rootViewController?.present(subview.controller, animated: subview.animated)
        }
    }

    @objc func invalidate() {
        RNRModalsContainer.ready = false

        let count = _reactSubviews.count
        DispatchQueue.main.sync {
            var current = 0
            for subview in _reactSubviews {
                subview.controller.dismiss(animated: false, completion: {
                    subview.controller.view.removeFromSuperview()
                    subview.controller.removeFromParent()
                    current += 1
                    if (current == count) {
                        RNRModalsContainer.ready = true
                    }
                })
            }
            if (count == 0) {
                RNRModalsContainer.ready = true
            }
            _reactSubviews.removeAll()
        }
    }
}
