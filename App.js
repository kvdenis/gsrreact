import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import images from 'res/images'
import { StackNavigator, createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { Menu } from './src/screens/main/Menu'
import { CountryNewsLayout } from './src/screens/main/news/CountryNewsLayout'
import { CityNewsLayout } from './src/screens/main/news/CityNewsLayout'
import { RosatomNewsLayout } from './src/screens/main/news/RosatomNewsLayout'
import { OpenNews } from './src/screens/main/news/OpenNews'
import { NewsCommentsLayout } from './src/screens/main/news/NewsCommentsLayout'
import { CityProjectsLayout } from './src/screens/main/projects/CityProjectsLayout'
import { ProjectsLayout } from './src/screens/main/projects/ProjectsLayout'
import { OpenProject } from './src/screens/main/projects/OpenProject'
import { VoiceLayout } from './src/screens/main/voice/VoiceLayout'
import { OpenVoice } from './src/screens/main/voice/OpenVoice'
import { WebViewLayout } from './src/screens/main/WebViewLayout'
import { BusinessLayout } from './src/screens/main/business/BusinessLayout'
import { CompaniesLayout } from './src/screens/main/business/CompaniesLayout'
import { OpenCompany } from './src/screens/main/business/OpenCompany'
import { OpenBusiness } from './src/screens/main/business/OpenBusiness'
import { ProfileLayout } from './src/screens/main/profile/ProfileLayout'
import { AboutLayout } from './src/screens/main/AboutLayout'
import { ProfileRules } from './src/screens/main/profile/ProfileRules'
import { ProfileSog } from './src/screens/main/profile/ProfileSog'
import { ProfilePolicy } from './src/screens/main/profile/ProfilePolicy'
import { UserLavel } from './src/screens/main/profile/UserLavel'
import { UserBonus } from './src/screens/main/profile/UserBonus'
import { AuthLayout } from './src/screens/main/AuthLayout'
import { CitySelectLayout } from './src/screens/main/CitySelectLayout'
import { AnonsLayout } from './src/screens/main/anons/AnonsLayout'
import { OpenAnons } from './src/screens/main/anons/OpenAnons'
import { OpenAds } from './src/screens/main/anons/OpenAds'
import { BlogLayout } from './src/screens/main/BlogLayout'
import { w, h } from './constants'


const styles = StyleSheet.create({
  mainview: {
    backgroundColor: '#f5f6f9',
    height: h
  },
  header: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 64,
    backgroundColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 0.1
  },
  pagetitle: {
    fontSize: 16,
    lineHeight: 44,
    color: '#07296F'
  },
  burger: {
    position: 'absolute',
    width: 44,
    height: 44,
    left: 0,
    top: 20
  },
  backarrow: {
    width: 44,
    height: 44
  },
  headerrightbtn: {
    width: 44,
    height: 44
  }
})


const { backarrow, headerrightbtn } = styles

// AsyncStorage.getItem('profileLogin') ? props.navigation.navigate('ProfileScreen') : props.navigation.navigate('Auth')

const DrawerConfig = {
  drawerWidth: w+10,
  contentComponent: ({ navigation }) => {
    return (<Menu navigation={navigation} />)
  }
}
const DrawerButton = (props) => {
	return (
    <View>
      <TouchableOpacity onPress={() => {props.navigation.openDrawer()}}>
        <Image style={backarrow} source={images.burger} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
};
const ProfileButton = (props) => {
	return (
    <View>
      <TouchableOpacity onPress={() => {
        AsyncStorage.getItem('userdata').then((keyValue) => {
          if (keyValue != null){
            props.navigation.navigate('ProfileScreen')

          }else{
            props.navigation.navigate('Auth')
          }
        }, (error) => {
          console.log('error')
        })
      }}>
        <Image style={backarrow} source={images.settings} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
};

const AppNavigator = createStackNavigator(
  {
    CountryNewsScreen: {
      screen: CountryNewsLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Новости страны',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerLeft: <DrawerButton navigation={navigation}  />,
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    WebViewScreen: {
      screen: WebViewLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Внешняя ссылка',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.05
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    CityNewsScreen: {
      screen: CityNewsLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Новости города',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    RosatomNewsScreen: {
      screen: RosatomNewsLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Новости ГК Росатом',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    OpenCountryNewsScreen: {
      screen: OpenNews,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Новости страны',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    OpenCityNewsScreen: {
      screen: OpenNews,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Новости города',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    OpenRosatomNewsScreen: {
      screen: OpenNews,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Новости ГК Росатом',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    NewsCommentsLayoutScreen: {
      screen: NewsCommentsLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Комментарии',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    CityProjectsScreen: {
      screen: CityProjectsLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Городские проекты',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    ProjectsScreen: {
      screen: ProjectsLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Проекты ГК Росатом',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.05
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    OpenCityProjectsScreen: {
      screen: OpenProject,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Городские проекты',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    OpenProjectsScreen: {
      screen: OpenProject,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Проекты ГК Росатом',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    VoiceScreen: {
      screen: VoiceLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Городские голосования',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.05
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    OpenVoiceScreen: {
      screen: OpenVoice,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Городские голосования',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    BusinessScreen: {
      screen: BusinessLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Городские проекты',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    CompaniesScreen: {
      screen: CompaniesLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Городская справка',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    OpenCompanyScreen: {
      screen: OpenCompany,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Городская справка',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    OpenBusinessScreen: {
      screen: OpenBusiness,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Бизнес среда',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    AboutScreen: {
      screen: AboutLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'О нас',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    BlogScreen: {
      screen: BlogLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Сообщества',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    ProfileScreen: {
      screen: ProfileLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Профиль',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    UserLavelScreen: {
      screen: UserLavel,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Уровень участия',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    UserBonusScreen: {
      screen: UserBonus,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Мои бонусы',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    ProfileRulesScreen: {
      screen: ProfileRules,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Правила участия',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    AnonsScreen: {
      screen: AnonsLayout,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Анонсы, объявления',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    OpenAnonsScreen: {
      screen: OpenAnons,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Анонсы',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
    OpenAdsScreen: {
      screen: OpenAds,
      navigationOptions:({navigation}) => ({
        headerTitle: 'Объявления',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 10,
          shadowOpacity: 0.1
        },
        headerTitleStyle: {
          color: '#07296F',
          fontSize: 16,
          fontWeight: 400
        },
        headerBackTitleStyle: {
          fontSize: 0,
          color: 'white'
        },
        headerRight: <ProfileButton navigation={navigation}  />,
        headerBackImage: <Image style={backarrow} source={images.back} resizeMode="cover" />
      })
    },
  },
  {
    initialRouteName: 'CountryNewsScreen'
  }
)



const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppNavigator
    },
    WebViewScreen: {
      screen: WebViewLayout
    },
    CountryNewsScreen: {
      screen: CountryNewsLayout
    },
    CityNewsScreen: {
      screen: CityNewsLayout
    },
    RosatomNewsScreen: {
      screen: RosatomNewsLayout
    },
    OpenCountryNewsScreen: {
      screen: OpenNews
    },
    OpenCityNewsScreen: {
      screen: OpenNews
    },
    OpenRosatomNewsScreen: {
      screen: OpenNews
    },
    OpenRosatomNewsScreen: {
      screen: OpenNews
    },
    NewsCommentsLayoutScreen: {
      screen: NewsCommentsLayout
    },
    ProjectsScreen: {
      screen: ProjectsLayout
    },
    OpenProjectScreen: {
      screen: OpenProject
    },
    OpenCityProjectScreen: {
      screen: OpenProject
    },
    VoiceScreen: {
      screen: VoiceLayout
    },
    OpenVoiceScreen: {
      screen: OpenVoice
    },
    BusinessScreen: {
      screen: BusinessLayout
    },
    CompaniesScreen: {
      screen: CompaniesLayout
    },
    OpenBusinesssScreen: {
      screen: OpenBusiness
    },
    OpenCompanyScreen: {
      screen: OpenCompany
    },
    AboutScreen: {
      screen: AboutLayout
    },
    BlogScreen: {
      screen: BlogLayout
    },
    ProfileScreen: {
      screen: ProfileLayout
    },
    UserLavelScreen: {
      screen: UserLavel
    },
    UserBonusScreen: {
      screen: UserBonus
    },
    ProfileRulesScreen: {
      screen: ProfileRules
    },
    AnonsScreen: {
      screen: AnonsLayout
    },
    OpenAnonsScreen: {
      screen: OpenAnons
    },
    OpenAdsScreen: {
      screen: OpenAds
    },
  },
  DrawerConfig
)

const RootNavigator = createStackNavigator(
  {
    MainApp: {
      screen: DrawerNavigator
    },
    Auth: {
      screen: AuthLayout
    },
    CitySelect: {
      screen: CitySelectLayout
    },
    ProfileSogScreen: {
      screen: ProfileSog
    },
    ProfilePolicyScreen: {
      screen: ProfilePolicy
    }
  },{
    headerMode: 'none',
    mode: 'modal'
  }
)


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {userdata: []}
  }

  componentDidMount = async () => {
    AsyncStorage.getItem("userdata").then((value) => {
      this.setState({
        userdata: value
      })
    })
    .then(res => {
    });


  }

  render() {
    return (
      <AppContainer
        screenProps={{ rootNavigation: this.props.navigation, userdata: this.state.userdata }}
        ref={nav => {
          this.navigator = nav
        }}
      />
    )
  }
}
export default App

const AppContainer = createAppContainer(RootNavigator)
