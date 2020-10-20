struct RNRNavigationAction {
    @available(iOS 13.0, *)
    static func getAction(_ attributes: NSDictionary, onSelect: @escaping (UIAction, String) -> Void) -> UIAction {
        var attrs: UIMenuElement.Attributes = []
        if RCTConvert.nsNumber(attributes["disabled"]) == 1 {
            attrs.insert(UIMenuElement.Attributes.disabled)
        }
        if RCTConvert.nsNumber(attributes["destructive"]) == 1 {
            attrs.insert(UIMenuElement.Attributes.destructive)
        }
        if RCTConvert.nsNumber(attributes["hidden"]) == 1 {
            attrs.insert(UIMenuElement.Attributes.hidden)
        }
        var state: UIMenuElement.State
        if attributes["state"] != nil {
            if attributes["state"] as! String == "on" {
                state = UIMenuElement.State.on
            } else if attributes["state"] as! String == "mixed" {
                state = UIMenuElement.State.mixed
            } else {
                state = UIMenuElement.State.off
            }
        } else {
            state = UIMenuElement.State.off
        }

        return UIAction(
                title: attributes["title"] != nil ? attributes["title"] as! String : "",
                image: attributes["image"] != nil ? RNRNavigationImage.getImage(RCTConvert.nsDictionary(attributes["image"])! as NSDictionary) : nil,
                identifier: (attributes["identifier"] != nil) ? UIAction.Identifier(rawValue: attributes["identifier"] as! String) : nil,
                discoverabilityTitle: RCTConvert.nsString(attributes["discoverabilityTitle"]),
                attributes: attrs,
                state: state,
                handler: { action in
                    if RCTConvert.nsNumber(attributes["_hasOnPress"]) == 1 {
                        onSelect(action, attributes["_id"] as! String)
                    }
                }
        )
    }
}