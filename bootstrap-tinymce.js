angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/tinymce/tinymce.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError()}\">\r\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\r\n  <textarea\r\n    tx-tinymce=\"form.tinymceOptions\"\r\n    ng-model=\"$$value$$\"\r\n    style=\"background-color: white\" sf-field-model  sf-changed=\"form\" \r\n    schema-validate=\"form\"\r\n  ></textarea>\r\n  <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\r\n</div>\r\n");}]);
angular.module('schemaForm-tinymce', ['schemaForm', 'tx-tinymce']).config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider','sfBuilderProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider, sfBuilderProvider) {

    var wysiwyg = function(name, schema, options) {
    if (schema.type === 'string' && schema.format == 'html') {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'wysiwyg';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

    schemaFormProvider.defaults.string.unshift(wysiwyg);

  //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'wysiwyg',
    'directives/decorators/bootstrap/tinymce/tinymce.html');
    schemaFormDecoratorsProvider.createDirective('wysiwyg',
    'directives/decorators/bootstrap/tinymce/tinymce.html');
    var sfField = sfBuilderProvider.builders.sfField;
    var ngModel = sfBuilderProvider.builders.ngModel;
    var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
    var defaults = [sfField, ngModel];
    schemaFormDecoratorsProvider.defineAddOn('bootstrapDecorator', 'wysiwyg', 'directives/decorators/bootstrap/tinymce/tinymce.html', defaults);


  }]);
