public struct RNRContentMode {
    public static func getContentMode(_ value: String) -> UIView.ContentMode? {
        if value == "scaleToFill" {
            return UIView.ContentMode.scaleToFill
        } else if value == "scaleAspectFit" {
            return UIView.ContentMode.scaleAspectFit
        } else if value == "scaleAspectFill" {
            return UIView.ContentMode.scaleAspectFill
        } else if value == "redraw" {
            return UIView.ContentMode.redraw
        } else if value == "center" {
            return UIView.ContentMode.center
        } else if value == "top" {
            return UIView.ContentMode.top
        } else if value == "bottom" {
            return UIView.ContentMode.bottom
        } else if value == "left" {
            return UIView.ContentMode.left
        } else if value == "right" {
            return UIView.ContentMode.right
        } else if value == "topLeft" {
            return UIView.ContentMode.topLeft
        } else if value == "topRight" {
            return UIView.ContentMode.topRight
        } else if value == "bottomLeft" {
            return UIView.ContentMode.bottomLeft
        } else if value == "bottomRight" {
            return UIView.ContentMode.bottomRight
        }
        return nil
    }
}
