public struct RNROffset {
    public static func getOffset(_ value: NSDictionary?) -> UIOffset? {
        if value != nil {
            if value!["horizontal"] != nil && value!["vertical"] != nil {
                return UIOffset(
                        horizontal: value!["horizontal"] as! CGFloat,
                        vertical: value!["vertical"] as! CGFloat
                )
            }
        }
        return nil
    }
}
