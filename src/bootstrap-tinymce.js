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
