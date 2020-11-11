public protocol RNRParent: UIView {
    var isReady: Bool { get }
    func setup()
    func updateSubview(_ subview: UIView)
}
