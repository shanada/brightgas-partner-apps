import React from 'react'

import Template from './mainApp/template'

// MAIN LOGIN
import Intro from './loginApp/intro'
import Login from './loginApp/login'
import Register from './loginApp/register'
import RegisterOutlet from './loginApp/registerOutlet'

// MAIN USER ROLE
import UserHome from './mainApp/userHome'
import UserCulinary from './mainApp/userCulinary'
import UserCulinaryDetail from './mainApp/userCulinaryDetail'
import UserMenu from './mainApp/userMenu'
import UserMenuSearch from './mainApp/userMenuSearch'
import UserMenuDetail from './mainApp/userMenuDetail'
import UserReview from './mainApp/userReview'
import UserReviewDetail from './mainApp/userReviewDetail'
import UserVouchers from './mainApp/userVouchers'

// MAIN OUTLET ROLE
import OutletHome from './mainOutlet/outletHome'
import OutletMenu from './mainOutlet/outletMenu'
import OutletMenuForm from './mainOutlet/outletMenuForm'
import OutletProfile from './mainOutlet/outletProfile'
import OutletProfileForm from './mainOutlet/outletProfileForm'
import OutletClaimVoucher from './mainOutlet/outletClaimVoucher'

import DefaultHeader from '../components/common/header'
import { BackButton } from '../components/button/backButton';
import { Title } from '../components/common/title';
import { cd } from '../components/common/colorData';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { imgHeaderCulinary, imgHeaderPromo, imgHeaderReview } from '../components/common/assetData'

const loginNavigation = createStackNavigator(
  {
    Intro: {
      screen: Intro,
      navigationOptions: {
        headerShown: false
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {

      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: ()=> <DefaultHeader largeHeader headerImg={"R"} isNewLogin />
      }
    },
    RegisterOutlet: {
      screen: RegisterOutlet,
      navigationOptions: {
        header: ()=> <DefaultHeader largeHeader headerImg={"RO"} isNewLogin />
      }
    },
  },

  {
    initialRouteName: 'Intro',
    defaultNavigationOptions: ({ navigation }) => ({
      cardStyle: { backgroundColor: cd.background },
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerLeft: () => <BackButton onBackButton={() => navigation.goBack()} />
    }),
  }
)

const mainNavigation = createStackNavigator(
  {
    Template: {
      screen: Template,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: () => <Title image />,
        headerLeft: () => null
      },
    },
    UserHome: {
      screen: UserHome
    },
    UserCulinary: {
      screen: UserCulinary,
      navigationOptions: {
        header: props => <DefaultHeader userHeader userHeaderImg={imgHeaderCulinary} />
      }
    },
    UserCulinaryDetail: {
      screen: UserCulinaryDetail,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: ()=> <Title title={'Outlet'} />
      }
    },
    UserMenu: {
      screen: UserMenu
    },
    UserMenuSearch: {
      screen: UserMenuSearch
    },
    UserMenuDetail: {
      screen: UserMenuDetail,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: ()=> <Title title={'Detail'} />
      }
    },
    UserVouchers: {
      screen: UserVouchers,
      navigationOptions: {
        header: props => <DefaultHeader userHeader userHeaderImg={imgHeaderPromo} />
      }
    },
    UserReview: {
      screen: UserReview,
      navigationOptions: {
        header: props => <DefaultHeader userHeader userHeaderImg={imgHeaderReview} />
      }
    },
    UserReviewDetail: {
      screen: UserReviewDetail,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: ()=> <Title title={'Detail'} />
      }
    },
  },

  {
    initialRouteName: 'UserHome',
    defaultNavigationOptions: ({ navigation }) => ({
      cardStyle: { backgroundColor: cd.background },
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerLeft: () => <BackButton onBackButton={() => navigation.goBack()} />
    }),
  }
)

const outletNavigation = createStackNavigator(
  {
    Template: {
      screen: Template,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: () => <Title image />,
        headerLeft: () => null
      },
    },
    OutletHome: {
      screen: OutletHome
    },
    OutletMenu: {
      screen: OutletMenu,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: ()=> <Title title={'Daftar Menu'} />
      }
    },
    OutletMenuForm: {
      screen: OutletMenuForm,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />
      }
    },
    OutletProfile: {
      screen: OutletProfile,
      navigationOptions: {
        headerShown: false
      }
    },
    OutletProfileForm: {
      screen: OutletProfileForm,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: ()=> <Title title={'Edit Profil'} />
      }
    },
    OutletClaimVoucher: {
      screen: OutletClaimVoucher,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: ()=> <Title title={'Klaim Kupon User'} />
      }
    },
  },

  {
    initialRouteName: 'OutletHome',
    defaultNavigationOptions: ({ navigation }) => ({
      cardStyle: { backgroundColor: cd.background },
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerLeft: () => <BackButton onBackButton={() => navigation.goBack()} />
    }),
  }
)

export const LoginNavigator = createAppContainer(loginNavigation)
export const MainNavigator = createAppContainer(mainNavigation)
export const OutletNavigator = createAppContainer(outletNavigation)