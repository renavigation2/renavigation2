public class RNRAnimationOptionsValue {
    public var duration: TimeInterval
    public var delay: TimeInterval
    public var curve: UIView.AnimationOptions
    public var damping: CGFloat
    public var velocity: CGFloat
    public var useCurve: Bool

    public init(duration: TimeInterval, delay: TimeInterval, curve: UIView.AnimationOptions, damping: CGFloat, velocity: CGFloat, useCurve: Bool) {
        self.duration = duration
        self.delay = delay
        self.curve = curve
        self.damping = damping
        self.velocity = velocity
        self.useCurve = useCurve
    }
}

public class RNRAnimationOptions {
    public static func getOptions(_ options: NSDictionary?, defaultDuration: TimeInterval, defaultDelay: TimeInterval, defaultCurve: UIView.AnimationOptions) -> RNRAnimationOptionsValue {
        var duration: TimeInterval = defaultDuration
        var delay: TimeInterval = defaultDelay
        var curve = UIView.AnimationOptions.curveEaseOut
        var damping: CGFloat = 0
        var velocity: CGFloat = 0
        var useCurve: Bool? = nil

        if options != nil {
            let animated = RCTConvert.nsNumber(options!["animated"])
            if animated == -1 {
                duration = 0
            } else {
                let nextDuration = options!["duration"] != nil ? RCTConvert.double(options!["duration"]) : nil
                if nextDuration != nil {
                    duration = nextDuration!
                }
                let nextDelay = options!["delay"] != nil ? RCTConvert.double(options!["delay"]) : nil
                if nextDelay != nil {
                    delay = nextDelay!
                }
                let nextCurve = RCTConvert.nsString(options!["curve"])
                if nextCurve == "ease-in-out" {
                    useCurve = true
                    curve = UIView.AnimationOptions.curveEaseInOut
                } else if nextCurve == "ease-in" {
                    useCurve = true
                    curve = UIView.AnimationOptions.curveEaseIn
                } else if nextCurve == "ease-out" {
                    useCurve = true
                    curve = UIView.AnimationOptions.curveEaseOut
                } else if nextCurve == "linear" {
                    useCurve = true
                    curve = UIView.AnimationOptions.curveLinear
                }
                if useCurve != true {
                    let nextDamping = options!["damping"] != nil ? RCTConvert.cgFloat(options!["damping"]) : nil
                    if nextDamping != nil {
                        useCurve = false
                        damping = nextDamping!
                    }
                    let nextVelocity = options!["velocity"] != nil ? RCTConvert.cgFloat(options!["velocity"]) : nil
                    if nextVelocity != nil {
                        useCurve = false
                        velocity = nextVelocity!
                    }
                }
            }
        }
        if useCurve != false {
            useCurve = true
        }

        return RNRAnimationOptionsValue(duration: duration, delay: delay, curve: curve, damping: damping, velocity: velocity, useCurve: useCurve!)
    }
}
