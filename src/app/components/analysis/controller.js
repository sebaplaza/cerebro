angular.module('cerebro').controller('AnalysisController', ['$scope',
  '$location', '$timeout', 'AlertService', 'AnalysisDataService',
  'AceEditorService',
  function($scope, $location, $timeout, AlertService, AnalysisDataService,
   AceEditorService) {

    $scope.analyzerAnalysis = {index: undefined, analyzer: undefined};
    $scope.propertyAnalysis = {index: undefined, field: undefined};

    $scope.indices = [];
    $scope.fields = [];
    $scope.analyzers = [];

    // Token Filters by default (can help users to understand the feature)
    var TokenFiltersBase = JSON.stringify(
      [
        'lowercase',
        'asciifolding',
        {
          type: 'edge_ngram',
          min_gram: 1,
          max_gram: 20
        }
      ],
      undefined,
      2
    );

    // Tokenizer by default (can help users to understand the feature)
    $scope.tokenizer = 'standard';

    $scope.initEditor = function() {
      if (!$scope.editor) {
        $scope.editor = AceEditorService.init('filter-body-editor');
        $scope.editor.setValue(TokenFiltersBase);
      }
    };

    $scope.loadAnalyzers = function(index) {
      AnalysisDataService.getIndexAnalyzers(index,
        function(analyzers) {
          $scope.analyzers = analyzers;
        },
        function(error) {
          $scope.analyzers = [];
          AlertService.error('Error loading index analyzers', error);
        }
      );
    };

    $scope.loadFields = function(index) {
      AnalysisDataService.getIndexFields(index,
        function(fields) {
          $scope.fields = fields;
        },
        function(error) {
          $scope.fields = [];
          AlertService.error('Error loading index fields', error);
        }
      );
    };

    $scope.analyzeByField = function(index, field, text) {
      if (text && field && text) {
        $scope.field_tokens = undefined;
        var success = function(response) {
          $scope.field_tokens = response;
        };
        var error = function(error) {
          AlertService.error('Error analyzing text by field', error);
        };
        AnalysisDataService.analyzeByField(index, field, text, success, error);
      }
    };

    $scope.analyzeCustom = function(index, tokenizer, text) {
      if (text) {
        var filter = $scope.editor.getValue();

        $scope.custom_tokens = undefined;
        var success = function(response) {
          $scope.custom_tokens = response;
        };
        var error = function(error) {
          AlertService.error('Error analyzing text by custom analyzer', error);
        };
        AnalysisDataService.analyzeCustom(index, tokenizer, filter,
                      text, success, error);
      }
    };

    $scope.analyzeByAnalyzer = function(index, analyzer, text) {
      if (text && analyzer && text) {
        $scope.analyzer_tokens = undefined;
        var success = function(response) {
          $scope.analyzer_tokens = response;
        };
        var error = function(error) {
          AlertService.error('Error analyzing text by analyzer', error);
        };
        AnalysisDataService.analyzeByAnalyzer(
          index,
          analyzer,
          text,
          success, error
        );
      }
    };

    $scope.setup = function() {
      $scope.initEditor();

      AnalysisDataService.getOpenIndices(
        function(indices) {
          $scope.indices = indices;
        },
        function(error) {
          AlertService.error('Error loading indices', error);
        }
      );
    };

  }
]);
