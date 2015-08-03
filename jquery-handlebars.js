; (function($, undefined) {

    // Initial idea: http://blog.teamtreehouse.com/handlebars-js-part-3-tips-and-tricks

    // Plugin Logic
    $.fn.extend({

        handlebars: function(template, data, options) {

            // The data object literal must contain data
            if ($.isEmptyObject(data)) {
                return this;
            }

            // Set our options from the defaults, overriding with the
            // parameter we pass into this function
            // options = $.extend({}, $.fn.handlebars.options, options);

            // jQuery object reference
            var $selector = null,

                // jQuery object reference for this. Only select the first selector of the collection
                $this = $(this).first();

            // If a string is passed then check if it's compiled or get the jQuery object
            if (typeof template === 'string') {

                // If compiled already
                if (typeof compiled[template] === 'function') {

                    // Debugging only
                    console.log(template + ' already exists');

                    // Return to continue chaining
                    return setElement(this, $this, compiled[template](data));

                }

                // Not compiled

                // Get the first selection only
                $selector = $(template).first();

                // If the selector doesn't exist for whatever reason, then set to null
                if ($selector.length === 0) {
                    $selector = null;
                }

            // If a valid jQuery selector object
            } else if (template instanceof $ && typeof template.length === 'number' && template.length > 0) {

                // Get the first selection only
                $selector = template.first();

                // Get the selector name for using with the compiled object literal
                // If the selector property doesn't exist, then this will be set to null
                template = typeof $selector.selector !== 'undefined' ? $selector.selector : null;

                // If compiled already
                if (template !== null && typeof compiled[template] === 'function') {

                    // Debugging only
                    console.log(template + ' already exists');

                    // Return to continue chaining
                    return setElement(this, $this, compiled[template](data));

                }
            }

            // If an invalid selector, then return this to continue chaining
            if ($selector === null || template === null || $selector.length === 0) {
                return this;
            }

            // Get the HTML of the template only
            var html = $selector.html();

            // Store the compiled template in the compiled store
            compiled[template] = Handlebars.compile(html);

            // Return to continue chaining
            return setElement(this, $this, compiled[template](data));
        }

    });

    // Fields (Private)
    var compiled = {};

    // Methods (Private)

    // Helper function for setting an element with a template
    var setElement = function(self, $self, compiled) {
        // Empty the previous contents of this, excluding all Handlebarjs template script elements

        // $self.children('*').not('script[type="text/x-handlebars-template"]').empty();
        // $self.children('*:not(script[type="text/x-handlebars-template"])').empty();

        $self.contents().filter(function() {
            // Only filter those which don't have the handlebars type and SCRIPT node name
            return this.nodeName !== 'SCRIPT' || this.type !== 'text/x-handlebars-template';

            // Remove from the DOM
        }).remove();

        // Append to this
        $self.append(compiled);

        return self;
    };

    // Defaults
    // $.fn.handlebars.options = {

    // };

})(jQuery);