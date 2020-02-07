import { StyleSheet } from 'react-native';
import { observable, action, reaction } from 'mobx';

import { DARK_THEME, LIGHT_THEME } from './Colors';

const repetitions = 8;
const step = 5;

const dynamicStyles = {};

for (let index = 0; index < repetitions; index++) {
  let value = step * index;
  const post = index === 1 ? '' : `${index}x`;
  dynamicStyles[`margin${post}`] = { margin: value };
  dynamicStyles[`marginVertical${post}`] = { marginVertical: value };
  dynamicStyles[`marginTop${post}`] = { marginTop: value };
  dynamicStyles[`marginLeft${post}`] = { marginLeft: value };
  dynamicStyles[`marginRight${post}`] = { marginRight: value };
  dynamicStyles[`marginBottom${post}`] = { marginBottom: value };
  dynamicStyles[`marginHorizontal${post}`] = { marginHorizontal: value };

  dynamicStyles[`padding${post}`] = { padding: value };
  dynamicStyles[`paddingVertical${post}`] = { paddingVertical: value };
  dynamicStyles[`paddingTop${post}`] = { paddingTop: value };
  dynamicStyles[`paddingLeft${post}`] = { paddingLeft: value };
  dynamicStyles[`paddingRight${post}`] = { paddingRight: value };
  dynamicStyles[`paddingBottom${post}`] = { paddingBottom: value };
  dynamicStyles[`paddingHorizontal${post}`] = { paddingHorizontal: value };
}

/**
 * ThemedStylesStore
 */
class ThemedStylesStore {
  /**
   * Theme observable
   * 1 Dark
   * 0 Light
   * -1 Not loaded
   * @property {Observable<numeric>}
   */
  @observable theme = -1;

  /**
   * Style
   */
  style = {};

  /**
   * Initialice themed styles
   */
  async init() {
    // load stored theme value here
    this.generateStyle();
  }

  @action
  setDark() {
    this.theme = 1;
    this.generateStyle();
  }

  @action
  setLight() {
    this.theme = 0;
    this.generateStyle();
  }

  onThemeChange(fn) {
    return reaction(() => [this.theme], async args => await fn(...args), {
      fireImmediately: false,
    });
  }

  /**
   * Generates the current theme
   */
  generateStyle() {

    const theme = this.theme ? DARK_THEME : LIGHT_THEME;

    this.style = StyleSheet.create({
      ...dynamicStyles,
      // containers
      flexContainer: {
        flex: 1,
      },
      flexContainerCenter: {
        flex: 1,
        justifyContent: 'center',
      },
      flexColumn: {
        flex: 1,
        flexDirection: 'column',
      },
      flexColumnStretch: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
      },
      flexColumnCentered: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      },
      rowJustifyEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
      },
      rowJustifyCenter: {
        flexDirection: 'row',
        justifyContent: 'center'
      },
      rowJustifySpaceEvenly: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      },
      rowJustifyStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
      },
      centered: {
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
      },
      colorWhite: {
        color: '#FFFFFF'
      },
      colorBlack: {
        color: '#000000'
      },
      colorPrimaryText: {
        color: theme.primary_text
      },
      colorSecondaryText: {
        color: theme.secondary_text
      },
      colorLink: {
        color: theme.link
      },
      colorButton: {
        color: theme.button_border
      },
      colorDone: {
        color: theme.done
      },
      colorActionNew: {
        color: theme.action
      },
      // backgrounds
      backgroundWhite: {
        backgroundColor: 'white'
      },
      backgroundBlack: {
        backgroundColor: 'black'
      },
      backgroundPrimary: {
        backgroundColor: theme.primary_background,
      },
      backgroundSecondary: {
        backgroundColor: theme.secondary_background,
      },
      // fonts
      fontXS: {
        fontSize: 10
      },
      fontS: {
        fontSize: 12
      },
      fontM: {
        fontSize: 14
      },
      fontL: {
        fontSize: 16
      },
      fontXL: {
        fontSize: 18
      },
      fontXXL: {
        fontSize: 24
      },
      fontXXXL: {
        fontSize: 30
      },

      // text align
      textRight: {
        textAlign: 'right'
      },
      textLeft: {
        textAlign: 'left'
      },
      textCenter: {
        textAlign: 'center'
      },
      textJustify: {
        textAlign: 'justify'
      },

      fullWidth: {
        width: '100%'
      },

      halfWidth: {
        width: '50%'
      },
      bold: {
        fontWeight: '700'
      },
      extraBold: {
        // fontWeight: '800'
        fontFamily: 'Roboto-Black', // workaround android ignoring >= 800
      },
      fontThin: {
        fontWeight: '200'
      },
      fontHairline: {
        fontWeight: '100'
      },
      fontLight: {
        fontWeight: '300'
      },
      fontNormal: {
        fontWeight: '400'
      },
      fontMedium: {
        fontWeight: '500'
      },
      fontSemibold: {
        fontWeight: '600'
      },
      // onboarding
      onboardingTitle: {
        color: '#AEB0B8',
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: 2,
      },
      onboardingSubtitle: {
        color: '#4A4A4A',
        fontSize: 26,
        lineHeight: 37,
        fontWeight: '600',
      },
      onboardingSteps: {
        color: '#A2A2A2',
        fontSize: 11,
        lineHeight: 15,
      },
      linkNew: {
        color: '#9B9B9B',
        fontSize: 13,
        lineHeight: 20
      },
      mindsLayoutBody: {
        flex: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
      },
      mindsLayoutFooter: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
      },
      titleText: {
        fontFamily: 'Roboto',
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 44,
      },
      subTitleText: {
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: '500',
        lineHeight: 23,
      },

      // inputs
      input: {
        color: theme.primary_text,
        fontSize: 16,
        padding: 10,
        fontFamily: 'Roboto',
        backgroundColor: 'transparent',
        height: 50,
        borderRadius: 2,
        borderColor: theme.button_border,
        borderWidth: 1,
        lineHeight: 21,
      },
      link: {
        color: theme.link,
        textDecorationLine: 'underline',
      },
      inputIcon: {
        position: 'absolute',
        right:8,
        top: Platform.OS === 'ios' ? 36 : 40,
        color: theme.primary_text,
      },
      button: {
        marginRight: 0,
        marginLeft: 0,
        backgroundColor: '#5DBAC0',
        borderColor: '#5DBAC0',
        borderWidth: 1,
        borderRadius: 2,
        height: 60,
      },
      buttonText: {
        // fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
      },
      checkbox: {
        backgroundColor: 'transparent',
        marginLeft: 0,
        paddingLeft: 0,
        borderWidth: 0,
        marginTop: 15,
      },
    });
  }
}

export default new ThemedStylesStore();