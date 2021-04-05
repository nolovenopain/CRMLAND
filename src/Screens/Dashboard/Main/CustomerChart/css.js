import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBody: {
        width: width,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftHeaderBody: {
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 17,
        color: '#3d3e40'
    },
    chartWrapper: {
        width: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    topChartTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#3d3e40',
        marginBottom: 5
    },
    bottomChartTitle: {
        fontSize: 9,
        color: '#666666'
    },
    chartTitle: {
        marginLeft: 20,
        marginBottom: 30,
        marginTop: 15
    },
    chart: {
        flexDirection: 'row',
        marginLeft: 40,
        marginBottom: 15
    },
    noteChart: {
        marginLeft: 20,
        width: width/2.7,
    },
    noteRow: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
    },
    color: {
        width: 25,
        height: 7,
    },
    textNote: {
        fontSize: 8,
        color: 'gray',
        marginLeft: 5
    },  
    noChart: {
        color: 'gray',
        marginBottom: 20,
        marginTop: 15
    }
});

export { styles };