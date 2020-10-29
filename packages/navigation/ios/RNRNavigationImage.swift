struct RNRNavigationImage {
    static func getImage(_ attributes: NSDictionary) -> UIImage {
        var image: UIImage = UIImage()

        if attributes["source"] != nil {
            image = RCTConvert.uiImage(attributes["source"])
        } else if (attributes["systemName"] != nil) {
            if #available(iOS 13.0, *) {
                image = UIImage(systemName: attributes["systemName"] as! String) ?? UIImage()
            }
        }

        for (k, value) in attributes {
            let key = k as! String
            if key == "alignmentRectInsets" {
                let v = RCTConvert.nsDictionary(value)! as NSDictionary
                if v["top"] != nil && v["left"] != nil && v["right"] != nil && v["bottom"] != nil {
                    image = image.withAlignmentRectInsets(UIEdgeInsets(top: v["top"] as! CGFloat, left: v["left"] as! CGFloat, bottom: v["bottom"] as! CGFloat, right: v["right"] as! CGFloat))
                }
            } else if key == "renderingMode" {
                if value as! String == "automatic" {
                    image = image.withRenderingMode(.automatic)
                } else if value as! String == "alwaysOriginal" {
                    image = image.withRenderingMode(.alwaysOriginal)
                } else if value as! String == "alwaysTemplate" {
                    image = image.withRenderingMode(.alwaysTemplate)
                }
            } else if key == "tintColor" {
                if #available(iOS 13.0, *) {
                    image = image.withTintColor(RCTConvert.uiColor(value))
                }
            }
        }

        return image
    }
}