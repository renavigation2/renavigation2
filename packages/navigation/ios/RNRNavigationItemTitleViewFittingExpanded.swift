class RNRNavigationItemTitleViewFittingExpanded: UIView {
    var uiManager: RCTUIManager?

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.translatesAutoresizingMaskIntoConstraints = false
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override var intrinsicContentSize: CGSize {
        UIView.layoutFittingExpandedSize
    }

    override func reactSetFrame(_ frame: CGRect) {
    }

    override func layoutSubviews() {
        uiManager?.setSize(frame.size, for: self)
    }
}