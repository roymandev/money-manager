import { PaperTab } from '@/components/utils/PaperTab';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function MainLayout() {
  return (
    <PaperTab>
      <PaperTab.Screen
        name="index"
        options={{
          title: 'Trans.',
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'notebook' : 'notebook-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <PaperTab.Screen
        name="statistics"
        options={{
          title: 'Stats',
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'chart-box' : 'chart-box-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <PaperTab.Screen
        name="accounts"
        options={{
          title: 'Accounts',
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? 'credit-card-multiple'
                  : 'credit-card-multiple-outline'
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
      <PaperTab.Screen
        name="others"
        options={{ title: 'More', tabBarIcon: 'dots-horizontal' }}
      />
    </PaperTab>
  );
}

export default MainLayout;
