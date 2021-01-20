import RenavigationCore

class RNRModal: UIView, RNRChild, RNRParent {
    var parent: RNRModals?
    var controller: RNRModalController? = RNRModalController()
    var uiManager: AnyObject?
    var bridge: AnyObject?
    var touchHandler: AnyObject?

    var isReady = false
    var isPresented = false
    var isDismissed = false
    var hasMovedToSuperview = false
    var hasUpdatedReactSubviews = false
    var hasFixedSize = false

    @objc var onWillAppear: RCTDirectEventBlock?
    @objc var onDidAppear: RCTDirectEventBlock?
    @objc var onWillDisappear: RCTDirectEventBlock?
    @objc var onDidDisappear: RCTDirectEventBlock?
    @objc var onDidDismiss: RCTDirectEventBlock?

    override init(frame: CGRect) {
        super.init(frame: frame)
        controller!.view = self
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func reactSetFrame(_ frame: CGRect) {
    }

    override func reactViewController() -> UIViewController {
        controller!
    }

    override func reactSuperview() -> UIView! {
        parent
    }

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        propagateWillMove(subview, self)
        super.insertReactSubview(subview, at: atIndex)
    }

    func propagateWillMove(_ subview: UIView!, _ parent: UIView!) {
        subview.willMove(toSuperview: parent)
        subview.reactSubviews()?.forEach { subSubview in
            propagateWillMove(subSubview, subview)
        }
    }

    func propagateDidMove(_ subview: UIView!) {
        subview.didMoveToSuperview()
        subview.reactSubviews()?.forEach { subSubview in
            propagateDidMove(subSubview)
        }
    }

    func updateSubview(_ subview: UIView) {
    }

    func setup() {
        if !isReady && hasMovedToSuperview && hasUpdatedReactSubviews && parent != nil {
            let childrenReady = areChildrenReady(reactSubviews())
            if childrenReady {
                isReady = true
                setupParent(parent!)

                if !isPresented {
                    // Fix for libraries like react-native-viewpager, re-propagate the didMoveToSuperview events
                    reactSubviews()?.forEach { subview in
                        propagateDidMove(subview)
                    }
                    parent!.present(self)
                }
            } else {
                DispatchQueue.main.async { [self] in
                    setup()
                }
            }
        }
    }

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        // Give time for the component to mount
        DispatchQueue.main.async { [self] in
            hasUpdatedReactSubviews = true
            setup()
        }
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview is RNRModals {
            parent = (newSuperview as! RNRModals)
            hasMovedToSuperview = true
            setup()
        }
    }

    override func didMoveToWindow() {
        if window != nil {
            if touchHandler == nil {
                touchHandler = RCTTouchHandler(bridge: (bridge as! RCTBridge))
            }
            if let t = touchHandler as? RCTTouchHandler {
                t.attach(to: self)
            }
        } else {
            if let t = touchHandler as? RCTTouchHandler {
                t.detach(from: self)
            }
        }
    }

    override func layoutSubviews() {
        if !hasFixedSize && uiManager != nil && (self as Any?) != nil && (bounds as Any?) != nil {
            let height = bounds.size.height
            let width = bounds.size.width
            uiManager?.setSize(bounds.size, for: self)
            if bounds.size.height == height && bounds.size.width == width {
                hasFixedSize = true
            }
        }
        super.layoutSubviews()
    }

    func willAppear() {
        if onWillAppear != nil {
            onWillAppear!([:])
        }
    }

    func didAppear() {
        if onDidAppear != nil {
            onDidAppear!([:])
        }
    }

    func willDisappear() {
        if onWillDisappear != nil {
            onWillDisappear!([:])
        }
    }

    func didDisappear() {
        if onDidDisappear != nil {
            onDidDisappear!([:])
        }
    }

    func didDismiss() {
        if onDidDismiss != nil {
            onDidDismiss!([:])
        }
    }
}
