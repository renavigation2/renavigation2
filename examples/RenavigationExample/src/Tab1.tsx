import React, { useCallback, useState } from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import { TabScreen, TabBarItem, Image, useTabs } from '@renavigation2/tabs'

interface Props {}

let renderCount = 0

export const Tab1: React.FC<Props> = ({}) => {
  renderCount++
  const { switch: switchTab } = useTabs()

  const onPress = useCallback(() => {
    switchTab('/settings')
  }, [switchTab])

  const [state, setState] = useState(2)

  return (
    <TabScreen
      tabBarItem={
        <TabBarItem title="Store" image={<Image systemName="bag" />} />
      }
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: 'black' }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text style={{ color: 'white', marginBottom: 20 }}>{renderCount}</Text>
        <Text style={{ color: 'white', marginBottom: 20 }}>
          ceroivneroinvoiren cer erpojvpoerh vopierh vopier hpoivh eropihees
          vpoierh vopier hpovi heropiv heoripho ivhpeoirh vioêrj hvôier
          hjiov^hjreoi vh êiorh voier erpojvpoerh vopierh vopier hpoivh eropih
          vpoierh vopier hpovi heropiv heoripho ivhpeoirh vioêrj hvôier
          hjiov^hjreoi vh êiorh voier erpojvpoerh vopierh vopier hpoivh eropih
          vpoierh vopier hpovi heropiv heoripho ivhpeoirh vioêrj hvôier
          hjiov^hjreoi vh êiorh voier erpojvpoerh vopierh vopier hpoivh eropih
          vpoierh vopier hpovi heropiv heoripho ivhpeoirh vioêrj hvôier
          hjiov^hjreoi vh êiorh voier erpojvpoerh vopierh vopier hpoivh eropih
          vpoierh vopier hpovi heropiv heoripho ivhpeoirh vioêrj hvôier
          hjiov^hjreoi vh êiorh voier erpojvpoerh vopierh vopier hpoivh eropih
          vpoierh vopier hpovi heropiv heoripho ivhpeoirh vioêrj hvôier
          hjiov^hjreoi vh êiorh voier erpojvpoerh vopierh vopier hpoivh eropih
          vpoierh vopier hpovi heropiv heoripho ivhpeoirh vioêrj hvôier
          hjiov^hjreoi vh êiorh voier
        </Text>
        <TouchableOpacity
          onPress={() => {
            setState((s) => s + 1)
          }}
        >
          <Text style={{ color: '#007AFF', marginBottom: 20 }}>
            Increase state
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: '#007AFF', marginBottom: 20 }}>
            Switch tab programatically
          </Text>
        </TouchableOpacity>
        <Text style={{ color: 'white', marginBottom: 20 }}>
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
        </Text>
        <Text style={{ color: 'white', marginBottom: 20 }}>
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
        </Text>
        <Text style={{ color: 'white', marginBottom: 20 }}>
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
        </Text>
        <Text style={{ color: 'white', marginBottom: 20 }}>
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
        </Text>
        <Text style={{ color: 'white' }}>
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
          erpojvpoerh vopierh vopier hpoivh eropih vpoierh vopier hpovi heropiv
          heoripho ivhpeoirh vioêrj hvôier hjiov^hjreoi vh êiorh voier
        </Text>
      </ScrollView>
    </TabScreen>
  )
}
