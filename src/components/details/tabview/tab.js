import React,{useState} from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import About from './about'
import Stats from './stats'
import Evo from './evo'

const initialLayout = { width: Dimensions.get('window').width };

function Tab(props) {
    const { allData, speciesData, currentId, evoData } = props
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: 'purple',
            }}
            style={{
                backgroundColor: 'white',
            }}
            activeColor="black"
            inactiveColor="grey"
        />
    );

    const AboutTab = () => (
        <About allData={allData} speciesData={speciesData} currentId={currentId}></About>
    );

    const StatsTab = () => (
        <Stats allData={allData} speciesData={speciesData} currentId={currentId}></Stats>
    )

    const EvolutionTab = () => (
        <Evo allData={allData} speciesData={speciesData} currentId={currentId} evoData={evoData}></Evo>
    );

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'about', title: 'About' },
        { key: 'stats', title: 'Stats' },
        { key: 'evolution', title: 'Evolution' },
    ]);

    const renderScene = SceneMap({
        about: AboutTab,
        stats: StatsTab,
        evolution: EvolutionTab,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
            activeColor="black"
            inactiveColor="grey"
            style={{ backgroundColor: 'white' }}
        />
    );
}

export default Tab;


