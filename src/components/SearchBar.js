import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const SearchBar = ({
  cityQuery,
  onChangeText,
  onSubmit,
  isSearching,
  suggestions,
  onSelectSuggestion,
  onClear,
}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBarRow}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search global cities..."
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          value={cityQuery}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
        {isSearching ? (
          <ActivityIndicator
            size="small"
            color="#FFF"
            style={styles.searchLoader}
          />
        ) : cityQuery ? (
          <TouchableOpacity onPress={onClear}>
            <Text style={styles.clearIcon}>✖</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Suggestions Overlay */}
      {cityQuery.trim().length >= 3 &&
        (suggestions.length > 0 ||
          (!isSearching && suggestions.length === 0)) && (
          <View style={styles.suggestionsCard}>
            {suggestions.length > 0 ? (
              suggestions.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.suggestionItem,
                    idx < suggestions.length - 1 && styles.suggestionBorder,
                  ]}
                  onPress={() => onSelectSuggestion(item.fullName)}>
                  <Text style={styles.suggestionText}>{item.fullName}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noSuggestionsItem}>
                <Text style={styles.noSuggestionsText}>🔍 No cities found</Text>
              </View>
            )}
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
    zIndex: 10,
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    paddingVertical: 8,
  },
  searchLoader: {
    marginLeft: 5,
  },
  clearIcon: {
    color: '#FFF',
    fontSize: 16,
    paddingHorizontal: 5,
  },
  suggestionsCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    borderRadius: 16,
    marginTop: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  suggestionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  suggestionText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  noSuggestionsItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noSuggestionsText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
});

export default SearchBar;
