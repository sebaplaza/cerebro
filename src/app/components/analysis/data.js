angular.module('cerebro').factory('AnalysisDataService', ['DataService',
  function(DataService) {

    this.getOpenIndices = function(success, error) {
      DataService.send('analysis/indices', {}, success, error);
    };

    this.getIndexAnalyzers = function(index, success, error) {
      DataService.send('analysis/analyzers', {index: index}, success, error);
    };

    this.getIndexFields = function(index, success, error) {
      DataService.send('analysis/fields', {index: index}, success, error);
    };

    this.analyzeByField = function(index, field, text, success, error) {
      var data = {index: index, field: field, text: text};
      DataService.send('analysis/analyze/field', data, success, error);
    };

    this.analyzeCustom = function(index, tokenizer, filter, text,
                          success, error) {
      var data = {
        index: index,
        tokenizer: tokenizer,
        filter: filter,
        text: text
      };

      DataService.send('analysis/analyze/custom', data, success, error);
    };

    this.analyzeByAnalyzer = function(index, analyzer, text, success, error) {
      var data = {index: index, analyzer: analyzer, text: text};
      DataService.send('analysis/analyze/analyzer', data, success, error);
    };

    return this;

  }
]);
