import { PaperTab } from '@/components/utils/PaperTab';

function HomeLayout() {
  return (
    <PaperTab>
      <PaperTab.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: 'home' }}
      />
      <PaperTab.Screen
        name="about"
        options={{ title: 'About', tabBarIcon: 'information' }}
      />
    </PaperTab>
  );
}

export default HomeLayout;
