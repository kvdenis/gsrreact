import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import images from 'res/images'
import { StackNavigator, createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

// Основное меню
import { Menu } from './src/screens/main/Menu'
// Новости страны
import { CountryNewsLayout } from './src/screens/main/news/CountryNewsLayout'
// Новости города
import { CityNewsLayout } from './src/screens/main/news/CityNewsLayout'
// Новости ГК Росатом
import { RosatomNewsLayout } from './src/screens/main/news/RosatomNewsLayout'
// Открытая новость
import { OpenNews } from './src/screens/main/news/OpenNews'
// Комментарии в новостях
import { NewsCommentsLayout } from './src/screens/main/news/NewsCommentsLayout'
// Городские прокты
import { CityProjectsLayout } from './src/screens/main/projects/CityProjectsLayout'
// Проекты ГК Росатом
import { ProjectsLayout } from './src/screens/main/projects/ProjectsLayout'
// Открытый проект
import { OpenProject } from './src/screens/main/projects/OpenProject'
// Голосования
import { VoiceLayout } from './src/screens/main/voice/VoiceLayout'
// Открытое голосование
import { OpenVoice } from './src/screens/main/voice/OpenVoice'
// WebView для ссылок
import { WebViewLayout } from './src/screens/main/WebViewLayout'
// Бизнес среда
import { BusinessLayout } from './src/screens/main/business/BusinessLayout'
// Справка
import { CompaniesLayout } from './src/screens/main/business/CompaniesLayout'
// Открытая комания из справки
import { OpenCompany } from './src/screens/main/business/OpenCompany'
// Открытая компании в бизнес среде
import { OpenBusiness } from './src/screens/main/business/OpenBusiness'
// Профиль пользователя
import { ProfileLayout } from './src/screens/main/profile/ProfileLayout'
// О компании
import { AboutLayout } from './src/screens/main/AboutLayout'
// Правила использования в профиле
import { ProfileRules } from './src/screens/main/profile/ProfileRules'
// Пользовательское соглашение в профиле
import { ProfileSog } from './src/screens/main/profile/ProfileSog'
// Политика в профиле
import { ProfilePolicy } from './src/screens/main/profile/ProfilePolicy'
// Уровень пользователя
import { UserLavel } from './src/screens/main/profile/UserLavel'
// Бонусы пользователя
import { UserBonus } from './src/screens/main/profile/UserBonus'
// Страница авторизации
import { AuthLayout } from './src/screens/main/AuthLayout'
// Модальное окно выбора города
import { CitySelectLayout } from './src/screens/main/CitySelectLayout'
// Анонасы, объявления
import { AnonsLayout } from './src/screens/main/anons/AnonsLayout'
// Оькрытый анонс
import { OpenAnons } from './src/screens/main/anons/OpenAnons'
// Открытое объявление
import { OpenAds } from './src/screens/main/anons/OpenAds'
// Сообщества
import { BlogLayout } from './src/screens/main/BlogLayout'
// Получение размеров экрана
import { w, h } from './constants'


// стили навигатора
const styles = StyleSheet.create({
  mainview: {
    backgroundColor: '#f5f6f9',
    height: h
  },
  // шапка с элементами навигации
  header: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 64,
    backgroundColor: '#fff',
    shadowRadius: 10,
    shadowOpacity: 0.1
  },
  // стили заголовка
  pagetitle: {
    fontSize: 16,
    lineHeight: 44,
    color: '#07296F'
  },
  // бургер
  burger: {
    position: 'absolute',
    width: 44,
    height: 44,
    left: 0,
    top: 20
  },
  // стрелка назад
  backarrow: {
    width: 44,
    height: 44
  },
  // правая кнопка в шапке
  headerrightbtn: {
    width: 44,
    height: 44
  }
})

// стили в объекте
const { backarrow, headerrightbtn } = styles

// добавление Drawer
const DrawerConfig = {
  drawerWidth: w+10,
  contentComponent: ({ navigation }) => {
    return (<Menu navigation={navigation} />)
  }
}

// Левая кнопка в шапке
const DrawerButton = (props) => {
	return (
    <View>
      <TouchableOpacity onPress={() => {props.navigation.openDrawer()}}>
        <Image style={backarrow} source={images.burger} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
};

// Кнопка для открытия профиля в шапке
const ProfileButton = (props) => {
	return (
    <View>
      <TouchableOpacity onPress={() => {
        // получение данных о пользователе из AsyncStorage
        AsyncStorage.getItem('userdata').then((keyValue) => {
          if (keyValue != null){
            // если данные есть перекидываем в профиль
            props.navigation.navigate('ProfileScreen')

          }else{
            // если данных нет открываем окно авторизации
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

// прописываем страницы в навигаторе
const AppNavigator = createStackNavigator(
  {
    // раздел новостей страны
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
    // WebView для ссылок
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
    // Новости города
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
    // Новости росатома
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
    // Открытая новость страны
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
    // Открытая новость города
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
    // Открытая новость ГК Росатом
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
    // Экран комментариев для новости
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
    // Городские проекты
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
    // Проекты ГК Росатом
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
    // Открытый городской проект
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
    // Открытый проект ГК Росатом
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
    // Голосования
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
    // Открытое голосование
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
    // Бизнес среда
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
    // Справка
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
    // Открытая компания в справке
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
    // Открытая компания в бизнес среде
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
    // О нас
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
    // Сообщества
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
    // Профиль
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
    // Уровни пользователя
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
    // Бонусы пльзователя
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
    // Правила
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
    // Анонсы, объявления
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
    // Открытый анонс
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
    // Открытое объявление
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


// Создание основного навигатора
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


// Добавление в основной навигатор модальных окон авторизации, выбора города, соглашение и политики
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

// отрисовываем
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
