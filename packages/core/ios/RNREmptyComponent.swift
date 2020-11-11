class RNREmptyComponent: UIView, RNRChild, RNREmptyComponentProtocol {
    var isReady = true

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
