import RenavigationCore

class RNRNavigationItemTitleView: UIView {
    var uiManager: RCTUIManager?

    override func layoutSubviews() {
        uiManager?.setSize(frame.size, for: self)
        super.layoutSubviews()
    }
}
