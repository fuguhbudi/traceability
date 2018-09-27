import React, { Component } from 'react'
import { TouchableHighlight, Text, TextInput, View } from 'react-native'
import stringScore from 'string_score'
import Styles from './Styles'
import {validation} from "helpers/utils";
import {InputTextNormal} from 'components/inputFields';
import {SetFormState} from 'helpers/redux/actions/formActions';
import {setDefaults} from 'helpers/utils/generic/dataTransfer';
import {PropTypes, i18n, connect, themes, staticIcons} from 'helpers/common';

class AutoComplete extends Component {
  componentDidMount () {
    this.suggestions = this.filterSugestions(
      this.props.suggestions, this.props.value
    )
  }

  componentWillUpdate (nextProps, nextState) {
    this.suggestions = this.filterSugestions(
      nextProps.suggestions, nextProps.value
    )
  }

  getSuggestionText = (suggestion) => {
    if (this.props.suggestionObjectTextProperty) {
      return suggestion[this.props.suggestionObjectTextProperty]
    }

    return suggestion
  }

  isSimilar = (value, suggestionText) => {
    const suggestionScore = stringScore(
      suggestionText, value, this.props.comparationFuzziness
    )

    return suggestionScore >= this.props.minimumSimilarityScore
  }

  shouldFilterSuggestions = (newSuggestions, value) => {
    return newSuggestions && newSuggestions.length &&
      value && !this.selectedSuggestion
  }

  filterSugestions = (newSuggestions, value) => {
    //  Enable local filter
    // return newSuggestions.reduce((suggestions, suggestion) => {
    //   const suggestionText = this.getSuggestionText(suggestion)
    //
    //   if (!suggestionText || !this.isSimilar(value, suggestionText)) {
    //     return suggestions
    //   }
    //
    //   suggestions[suggestionText] = suggestion
    //   return suggestions
    // }, {})

      // Disable local filter
      if (!this.shouldFilterSuggestions(newSuggestions, value)) {
          return {}
      }
      return newSuggestions.reduce((suggestions, suggestion) => {
          const suggestionText = this.getSuggestionText(suggestion)
          suggestions[suggestionText] = suggestion
          return suggestions
      }, {});
  }

  onChangeText = (fieldName, value) => {
    this.selectedSuggestion = false
      let filteredValue = value.replace(/[^\w\s]/gi, '');
    if (this.props.onChangeText) {
      this.props.onChangeText(filteredValue)
    }
  }

  suggestionClick = (suggestion) => {
    const {name, onSelect} = this.props;
    this.selectedSuggestion = true;
    this.suggestions = {};
    onSelect(name, suggestion);
    // setFormValues(suggestion.name);
  }

  renderSuggestions = () => {
    const suggestionTexts = Object.keys(this.suggestions || {})

    if (!suggestionTexts.length) {
      return null
    }

  // setFormValues = (suggestion) => {
  //     const {form, name} = this.props;
  //     let obj = {};
  //     obj[name] = suggestion;
  //     const defaults = setDefaults(form, obj);
  //     this.setState({ defaults: defaults });
  //     this.props.dispatch(SetFormState(defaults))
  // };

    return (
      <View
        style={this.props.suggestionsWrapperStyle || Styles.suggestionsWrapper}
      >
        {
          suggestionTexts.map((text, index) => (
            <TouchableHighlight
              key={index}
              suggestionText={text}
              activeOpacity={0.6}
              style={this.props.suggestionStyle || Styles.suggestion}
              onPress={() => {this.suggestionClick(this.suggestions[text])}}
              underlayColor='white'
            >
              <Text
                style={this.props.suggestionTextStyle || Styles.suggestionText}
              >
                {text}
              </Text>
            </TouchableHighlight>
          ))
        }
      </View>
    )
  }

  render () {
    return (
      <View style={this.props.style || Styles.wrapper}>
        <InputTextNormal
            {...this.props}
            onChangeText={this.onChangeText}
            parentStyle={{paddingRight: 50}}
        />

        {this.renderSuggestions()}
      </View>
    )
  }
}

AutoComplete.contextTypes = {
    form: PropTypes.object,
    constraints: PropTypes.object
};

AutoComplete.propTypes = {
    suggestions: PropTypes.array,
    value: PropTypes.string,
    minimumSimilarityScore: PropTypes.number,
    comparationFuzziness: PropTypes.number,
    suggestionObjectTextProperty: PropTypes.string,
    onChangeText: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    suggestionsWrapperStyle: PropTypes.any,
    suggestionStyle: PropTypes.any,
    suggestionTextStyle: PropTypes.any,
    style: PropTypes.any,
    inputStyle: PropTypes.any,
    dispatch: PropTypes.any
}

AutoComplete.defaultProps = {
  minimumSimilarityScore: 0.6,
  comparationFuzziness: 0.5
}

// export default AutoComplete

const mapStatesToProps = (state) => {
    return {
        form: state.form
    }
};

export default connect(mapStatesToProps)(AutoComplete);