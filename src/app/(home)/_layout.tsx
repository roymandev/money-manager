import { PaperTab } from '@/components/utils/PaperTab';

function MainLayout() {
  return (
    <PaperTab>
      <PaperTab.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: 'home' }}
      />
      <PaperTab.Screen
        name="transactions"
        options={{ title: 'Trans.', tabBarIcon: 'book' }}
      />
      <PaperTab.Screen
        name="statistics"
        options={{ title: 'Stats', tabBarIcon: 'chart-bar' }}
      />
      <PaperTab.Screen
        name="others"
        options={{ title: 'More', tabBarIcon: 'dots-horizontal' }}
      />
    </PaperTab>
  );
}

export default MainLayout;
