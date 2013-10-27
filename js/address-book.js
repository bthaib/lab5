/* address-book.js
    this is where you will add your JavaScript to complete Lab 5
*/


/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/


function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()

// This function will sort the entries, render them when the page is fully
// loaded and ready for manipulation and add event handlers for sort buttons
$(function() {
    render(Employees.entries);

    $('.sort-ui .btn').click(function(){
        var sortBtn = $(this);
        var sortAttr = sortBtn.attr('data-sortby');
        sortObjArray(Employees.entries, sortAttr);
        render(Employees.entries);
    })
});

// This function will merge the objects in the passed 
// entries array with the HTML in the <div class="template"> element.
function render(entries) {
    var instance;
    var addressbook = $('.address-book');
    var template = $('.template');
    addressbook.hide(); //hides the entire adddress book
    addressbook.empty(); // clears out any HTML that might already be in the <div class="address-book">
    $.each(Employees.entries, function(){
        instance = template.clone();
        for(prop in this) {
            if(prop === 'pic') {
                instance.find('.pic').attr({ 
                    src: this[prop],
                    alt: 'Picture of ' + this.first + ' ' + this.last
                });    
            } else {
                instance.find('.' + prop).html(this[prop]);
            }
            instance.removeClass('template');
            addressbook.append(instance);
        }   
    });
    addressbook.fadeIn(); //make the populated address book slowly fade in
}
