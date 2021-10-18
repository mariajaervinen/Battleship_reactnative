import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 20,
    backgroundColor: 'grey',
    flexDirection: 'row'
  },
  footer: {
    marginTop: 5,
    backgroundColor: 'grey',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    marginTop: 5
  },
  item: {
    margin: 10,
    padding: 5
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 10,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "yellow",
    width: 150,
    borderRadius: 15,
    borderColor: 'grey',
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"grey",
    fontWeight: 'bold',
    fontSize: 15
  }
});