public struct RNREdgeInsets {
    public static func getEdgeInsets(_ value: NSDictionary?) -> UIEdgeInsets? {
        if value != nil {
            if value!["top"] != nil && value!["left"] != nil &&
                       value!["right"] != nil && value!["bottom"] != nil {
                return UIEdgeInsets(
                        top: value!["top"] as! CGFloat,
                        left: value!["left"] as! CGFloat,
                        bottom: value!["bottom"] as! CGFloat,
                        right: value!["right"] as! CGFloat
                )
            }
        }
        return nil
    }
}
