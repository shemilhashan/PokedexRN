import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    scene: {
        flex: 1,
    }
});
function Stats(props) {
    const { allData, speciesData, currentId } = props
    let dataLoaded = allData[currentId - 1];
    let speciesLoaded = speciesData[currentId - 1];
    function getProgress(stat, total) {
        return (
            <View style={{ width: '100%', height: 4, flexDirection: 'row', borderRadius: 2, overflow: 'hidden', }}>
                <View style={{ flex: stat, height: 4, backgroundColor: stat / total >= 0.5 ? 'green' : 'red', }} />
                <View style={{ flex: total - stat, height: 4, backgroundColor: 'grey', }} />
            </View>
        );
    }
    const baseList = dataLoaded.stats.map((stat) => {
        return (
            <View style={{ flexDirection: 'row', paddingLeft: 20, marginTop: 5, marginBottom: 5, }}>
                <Text style={{ flex: 4, textAlign: 'left', fontWeight: 'bold', marginRight: 5, color: 'grey', }}>
                    {stat.name}
                </Text>
                <Text style={{ flex: 1, textAlign: 'left', fontWeight: 'bold', marginRight: 5, color: 'grey', }}>
                    {stat.value}
                </Text>
                <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>
                    {getProgress(stat.value, 100)}
                </View>
                <View style={{ width: 20 }} />
            </View>
        );
    });

    function otherStat(name, value) {
        return (
            <View style={{ flexDirection: 'row', paddingLeft: 20, marginTop: 5, marginBottom: 5, }}>
                <Text style={{ flex: 4, textAlign: 'left', fontWeight: 'bold', marginRight: 5, color: 'grey', }}>
                    {name}
                </Text>
                <Text style={{ flex: 9, textAlign: 'left', fontWeight: 'bold', marginRight: 5, color: 'grey', }}>
                    {value}
                </Text>
                <View style={{ width: 20, }}
                />
            </View>
        );
    }

    function total() {
        let statArr = dataLoaded.stats;
        var totalToDivide = 0;
        var total = 0;

        for (let i = 0; i < statArr.length; i++) {
            totalToDivide += 100;
            total += statArr[i].value;
        }

        return (
            <View style={{ flexDirection: 'row', paddingLeft: 20, marginTop: 5, marginBottom: 5, }}>
                <Text style={{ flex: 4, textAlign: 'left', fontWeight: 'bold', marginRight: 5, color: 'grey', }}>
                    Total
          </Text>
                <Text style={{ flex: 1, textAlign: 'left', fontWeight: 'bold', marginRight: 5, color: 'grey', }}>
                    {total}
                </Text>
                <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>
                    {getProgress(total, totalToDivide)}
                </View>
                <View style={{ width: 20, }} />
            </View>
        );
    }

    return (
        <View style={[styles.scene, { backgroundColor: 'white', },]}>
            <Text style={{ paddingLeft: 20, marginBottom: 10, marginTop: 20, fontWeight: 'bold', fontSize: 17, }}>
                Base Stats
        </Text>
            {baseList}
            {total()}
            <Text style={{ paddingLeft: 20, marginBottom: 10, marginTop: 20, fontWeight: 'bold', fontSize: 17, }}>
                Other Stats
        </Text>
            {otherStat('Experience', dataLoaded.base_experience)}
            {otherStat('Happiness', speciesLoaded.base_happiness)}
            {otherStat('Capture Rate', speciesLoaded.capture_rate)}
            {otherStat('Generation', speciesLoaded.generation.capitalize())}
            {otherStat('Growth Rate', speciesLoaded.growth_rate.capitalize())}
            {otherStat('Habitat', speciesLoaded.habitat.capitalize())}
        </View>
    );
}

export default Stats;


