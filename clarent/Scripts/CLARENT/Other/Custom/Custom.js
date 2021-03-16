//resize select at input search
function resizeInput(p_left, p_right) {
    if (p_left != '') {
        //  parent.$('.input-search > .form-control').css('padding-left', p_left + 'px');
        parent.$('.input-search > .filtered-list').css('left', p_left + 'px');
    }
    if (p_right != '') {
        //  parent.$('.input-search > .form-control').css('padding-right', p_right + 'px');
    }
}

function ActiveTabContentHeight(activetabContent) {
    var msgHeight = $(activetabContent).find('.status-msg').outerHeight(true);
    var bulletHeight = $(activetabContent).find('.bullet-content').outerHeight(true);
    var totHeight = bulletHeight + msgHeight;
    $(activetabContent).find('.k-treeview').css({ 'height': 'calc(100% - ' + totHeight + 'px)' });
}

function downloadExportResultGrid(repositoryid, apptoken) {
    var url = ARA.baseUri + "/api/eDD/DocListing/ExportToExcel/DownloadExcelExportFile?repositryid=" + repositoryid + "&apptoken=" + apptoken + "&_t=" + ARA.getToken();

    top.ARA.APIToCallAfterDualAuth = {};
    top.ARA.ExportDualAuth = true;
    top.ARA.APIToCallAfterDualAuth.url = url;
    top.ARA.APIToCallAfterDualAuth.type = 'GET';
    if (typeof top.window.OpenDualAuthenticationPopup != "undefined")
        top.window.OpenDualAuthenticationPopup();


}

function SetCompleteTooltipProcessing(IdORClass, isDestroy, text) {
    if (isDestroy) {
        if ($(IdORClass).data("kendoTooltip"))
            $(IdORClass).data("kendoTooltip").destroy();
    }
    $(IdORClass).kendoTooltip({
        content: function (e) {
            var tooltipText = null;
            if (text != undefined && text != '' && text != null)
                tooltipText = text;
            else
                tooltipText = $(e.target[0]).attr("data-ara-title");
            return '<div>' + kendo.htmlEncode(tooltipText) + '</div>';
        },
        showAfter: 10,
        show: function (e) { tooltipCallout(); }
    });
}

function SetCompleteTooltip(IdORClass, isDestroy, text) {
    if (isDestroy) {
        if ($(IdORClass).data("kendoTooltip"))
            $(IdORClass).data("kendoTooltip").destroy();
    }
    $(IdORClass).kendoTooltip({
        content: function (e) {
            var tooltipText = null;
            if (text != undefined && text != '' && text != null)
                tooltipText = text;
            else
                tooltipText = $(e.target[0]).attr("data-ara-title");
            return '<div>' + kendo.htmlEncode(tooltipText) + '</div>';
        },
        showAfter: 100,
        show: function (e) { tooltipCallout(); }
    });
}

function SetCenterViewToolTip(IdORClass, text) {
    if ($(IdORClass).data("kendoTooltip")) {
        var centerViewTooltip = $(IdORClass).data("kendoTooltip");
        centerViewTooltip.options.content = '<div>' + kendo.htmlEncode(text) + '</div>';
        centerViewTooltip.refresh();
    } else {
        $(IdORClass).kendoTooltip({
            content: function (e) {
                var tooltipText = null;
                if (text != undefined && text != '' && text != null)
                    tooltipText = text;
                else
                    tooltipText = $(e.target[0]).attr("data-ara-title");
                return '<div>' + kendo.htmlEncode(tooltipText) + '</div>';
            },
            showAfter: 100,
            show: function (e) { tooltipCallout(); }
        });
    }
}

function SetTemplateTooltip(IdORClass, templateId, isDestroy) {
    if (isDestroy) {
        if ($(IdORClass).data("kendoTooltip"))
            $(IdORClass).data("kendoTooltip").destroy();
    }
    $(IdORClass).kendoTooltip({
        content: kendo.template($(templateId).html()),
        showAfter: 100,
        show: function (e) { tooltipCallout(); }
    });
}

function tooltipCallout() {
    try { $(".k-callout-s").parent(".k-tooltip[role='tooltip']").css("margin-top", "-5px"); } catch (e) { }
    try { $(".k-callout-w").parent(".k-tooltip[role='tooltip']").css({ "margin-left": "5px", "margin-top": "0" }); } catch (e) { }
    try { $(".k-callout-n").parent(".k-tooltip[role='tooltip']").css("margin-top", "5px"); } catch (e) { }
    try { $(".k-callout-e").parent(".k-tooltip[role='tooltip']").css({ "margin-right": "5px", "margin-top": "0" }); } catch (e) { }

    try { $(".k-callout-s").parent(".k-tooltip[role='tooltip']").parent().css("margin-top", "-5px"); } catch (e) { }
    try { $(".k-callout-w").parent(".k-tooltip[role='tooltip']").parent().css("margin-right", "5px"); } catch (e) { }
    try { $(".k-callout-n").parent(".k-tooltip[role='tooltip']").parent().css("margin-top", "5px"); } catch (e) { }
    try { $(".k-callout-e").parent(".k-tooltip[role='tooltip']").parent().css("margin-right", "5px"); } catch (e) { }
}

function showToolTip() {
    $('*[data-ara-title]').kendoTooltip({
        content: function (e) {
            var tooltipText = $(e.target[0]).attr("data-ara-title");
            return '<div>' + kendo.htmlEncode(tooltipText) + '</div>';
        },
        showAfter: 100,
        show: function (e) { tooltipCallout(); }
    });
}

function findHighestZIndex(elem) {
    var elems = document.getElementsByTagName(elem);
    var highest = 0;
    for (var i = 0; i < elems.length; i++) {
        var zindex = document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index");
        if ((zindex > highest) && (zindex != 'auto')) {
            highest = zindex;
        }
    }
    return highest;
}

function nlTobr(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br/>' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
//browser
function getBrowserName() {
    try {
        var browsername = "";
        if (kendo.support.browser.mozilla)
            browsername = "Mozilla";
        else if (kendo.support.browser.msie)
            browsername = "IE";
        else if (kendo.support.browser.chrome)
            browsername = "Chrome";
        else if (kendo.support.browser.safari)
            browsername = "Safari";
        else if (kendo.support.browser.edge)
            browsername = "Edge";
        else browsername = "Other Browser";
        return browsername;
    } catch (e) {
        return "Browser Unavailable";
    }
}
// JavaScript Document
$(document).ready(function () {
    $(document).on("mouseenter", ".auto-tooltip", function (e) {
        if (this.scrollWidth > $(e.target).outerWidth()) {
            $(this).attr("title", $(this).text());
        }
        else {
            $(this).removeAttr("title");
        }
    });

    $(document).on("mouseenter focus", "[data-ara-title]", function (e) {
        if ($(this).hasClass("gridPagerTooltip"))
            return;
        if ($(this).data("kendoTooltip") == undefined && $(this).attr("data-role") != "aratooltipv2") {
            var tooltip = $(this).kendoTooltip({
                content: function (e) {
                    var tooltipText = $(e.sender.element).attr("data-ara-title");
                    return '<div>' + kendo.htmlEncode(tooltipText) + '</div>';
                },
                showAfter: 10,
                show: function (e) { tooltipCallout(); e.sender.popup.wrapper.css("z-index", "100001") }
            }).data("kendoTooltip");
            tooltip.show();
        }
    });
    $(window).resize(function () {
        var kendoWindow = $("[data-role='arapopupwindow']");
        for (var i = 0 ; i < kendoWindow.length; i++) {
            if ($(kendoWindow[i]).is(":visible")) {
                var win = $(kendoWindow[i]).data("kendoARAPopupWindow");
                win.center();
            }
        }
        var deleteWindow = $("[data-role='aradeleteconfirmation']");
        for (var i = 0 ; i < deleteWindow.length; i++) {
            if ($(deleteWindow[i]).is(":visible")) {
                var win = $(deleteWindow[i]).data("kendoARADeleteConfirmation");
                win.center();
            }
        }
    });

    $("#ulDisplayMode .k-checkbox").click(function () {
        var activetabContent = $('.left-sidebar-content').parent().find(".k-state-active");
        ActiveTabContentHeight(activetabContent);
    });

    $(document).on('click', '.dropdown > a, .dropup > a', function () {
        var attrExpand = $(this).attr('aria-expanded');

        $(this).siblings(".dropdown-menu").focus();

        if ($(this).parent('.dropdown:not(.notification-wrapper), .dropup').hasClass('open')) {

            $(this).parent('.dropdown, .dropup').removeClass('open');
            if (typeof attrExpand !== typeof undefined && attrExpand !== false) {
                $(this).attr("aria-expanded", "false");
            }

            $("#dvSwitchDbNotification").removeClass('msg-top').hide();
        }
        else {
            if (top.$('body').find('.notification-wrapper').hasClass('open')) {
                top.$('body').find('.notification-wrapper').removeClass("open").trigger('classChange');
                top.$('body').find('.notification-subscription').removeClass('open');
                top.$('body').find('.notification-section').removeClass('close');
            }
            $('.dropdown, .dropup').removeClass('open');
            var attr = $('.dropdown > a').attr('aria-expanded');
            if (typeof attr !== typeof undefined && attr !== false) {

                $('.dropdown > a').attr("aria-expanded", "false");
            }

            $(this).parent('.dropdown, .dropup').addClass('open');

            if (typeof attrExpand !== typeof undefined && attrExpand !== false) {
                $(this).attr("aria-expanded", "true");
            }

            if ($(this).siblings(".dropdown-menu").length) {
                $(this).siblings(".dropdown-menu").find(":tabbable").first().focus();
            }
            // user profile role dropdown description's ellipses logic
            if ($(this).attr("id") == "userRoleDropdown") {
                setTimeout(function () {
                    setProfileRole();
                }, 150);
            }
        }
    });

    $(document).on('click', '.dropdown-menu > li > a', function (e) {
        var $this = $(this);
        var $parents = $this.parents('.dropdown');
        var isOpen = $parents.hasClass('open');
        if (isOpen) {
            $parents.removeClass('open');
        }
        var attrExpand = $parents.children("a").attr('aria-expanded');
        if (typeof attrExpand !== typeof undefined && attrExpand !== false) {
            $parents.children("a").attr("aria-expanded", "false");
        }
        $('.menu-dynamic').remove();
    });


    //custom drodown menu close
    $(document).on("click", function (event) {
        var $trigger = $(".dropdown:not(#liSupportMail)");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            if (top.$('body').find('.notification-wrapper').hasClass('open')) {
                top.$('body').find('.notification-wrapper').removeClass("open").trigger('classChange');
                top.$('body').find('.notification-subscription').removeClass('open');
                top.$('body').find('.notification-section').removeClass('close');
            }
            $trigger.removeClass("open");
            //$(".dropdown > a").attr("aria-expanded", "false");
            var attr = $(".dropdown > a").attr('aria-expanded');
            if (typeof attr !== typeof undefined && attr !== false) {
                $(".dropdown > a").attr("aria-expanded", "false");
            }
        }
    });

    var handle = function (e) {
        if ($(document.activeElement).parents("#supportMail").length && top.$('body').find('#supportMail').hasClass('open') && $(document.activeElement).find(e.target).length == 0) return true;
        if ($(e.target).closest('.side-nav-toggle').length != 0) return true;
        if ($(e.target).closest('.userprofile-menu').length != 0) return true;
        if ($(e.target).closest('.dropdown-menu').length != 0) return true;
        if ($(e.target).closest('.dropdown').length != 0) return true;
        if ($(e.target).closest('.dropup').length != 0) return true;
        if ($(e.target).closest('.k-pager-sizes').length != 0) return true;
        if ($(document.activeElement).closest(".userprofile-menu .settings").length != 0) return true;
        if ($(e.target).find("#divALLSessionPopup").length != 0) return true;
        if ($(e.target).parents("#divALLSessionPopup").length != 0) return true;

        if (top.$('body').find('.notification-wrapper').hasClass('open')) {
            top.$('body').find('.notification-wrapper').removeClass("open").trigger('classChange');
            top.$('body').find('.notification-subscription').removeClass('open');
            top.$('body').find('.notification-section').removeClass('close');
        }
        top.$('body').find('.dropdown, .dropup').removeClass('open');
        top.$('body').find('.k-pager-sizes').hide();

        $('.dropdown, .dropup').removeClass('open');
        $('.k-pager-sizes').hide();

        if (!$("#infoBody").is(":visible")) {
            top.$('body').find('.userprofile-menu').removeClass('open');
            if (top.$('body').find('.notification-wrapper').hasClass('open')) {
                top.$('body').find('.notification-wrapper').removeClass('open').trigger('classChange');
                top.$('body').find('.notification-subscription').removeClass('open');
                top.$('body').find('.notification-section').removeClass('close');
                top.$('body').find('.dropdown.notification-wrapper').removeClass('open');
            }
            if (top.$('body').find('.userprofile').hasClass('active')) {
                top.$('body').find('.userprofile').removeClass('active').trigger('classChange');
            }
            if ($(e.target).closest(".k-popup-edit-form").length == 0 && $(e.target).closest(".k-overlay").length == 0) {
                top.$('body').find('.support-mail').removeClass('open');
                top.$('body').find('.settings').removeClass('open');
                top.$('body').find('.main-up').removeClass('close');
                top.$('body').find('.broadcast-drawer').removeClass('open');
                top.$('body').find('.broadcast-wrapper').removeClass('open');
                $('.userprofile-menu').removeClass('open');
                $('.settings').removeClass('open');
                $('.main-up').removeClass('close');
            }
        }
        if ($(e.target).closest(".workspace-holder").length == 0) {
            top.$('body').find('.workspace-toggle .ws-icon > i').removeClass('icon-cancel');
            top.$('body').find(".workspace-holder").removeClass("app-open");
            top.$('body').find(".workspace-toggle").removeClass("open");
            top.$('body').find('.workspace-toggle .ws-icon > i').addClass('icon-app-menu');
        }
    };
    var ua = window.navigator.userAgent;
    if (ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0) {
        document.addEventListener("mousedown", handle);
    }
    else {
        document.addEventListener("click", handle);
    }

    //$('.app-menu-toggle').on('click', function () {
    //    $('.app-menu').slideToggle();
    //    if ($('.pages-menu').css('display') == 'block') {
    //        $('.pages-menu').hide();
    //    }
    //    if ($('.mt-side-nav').hasClass('open')) {
    //        $('.mt-side-nav').removeClass('open');
    //    }
    //});

    $(document).on('click', '.notification-box .close', function () {
        kendo.widgetInstance($(this)).hide();
        $(this).parent('.notification-alert').remove();
    });
    $('.action-div .btn').click(function () {
        $('.k-pager-sizes').hide();
        $('.mt-navbar-pages .dropdown').removeClass('open');
    });
    $(document).on('click', '.msg-top .close', function () {
        $(this).parent('.msg-top').hide().removeClass('msg-top');
        $(this).parents(":tabbable").first().focus();
    });

    $('.form-close').click(function () {
        $(this).closest('.dropdown').removeClass('open');
    });
    //var orgHeight = $('.organization-section').outerHeight(true);
    //$(".workspace-section").css({ 'height': 'calc(100% - ' + orgHeight + 'px)' });

    $(document).click(function (e) {
        if ($(e.target).closest('.case-acc').length != 0) return true;
        if ($(e.target).closest('.account-holder').length != 0) return true;
        $('body').removeClass('workspace-open');
        $('.account-holder').slideUp('fast');

        $(".k-editor-overflow-popup").parents(".k-animation-container").css("display", "none");
        top.$(".k-editor-overflow-popup").parents(".k-animation-container").css("display", "none");
    });

    //anchor tag working on spacebar key (variable)
    var _catch_target = null;

    $(document).keydown(function (event) {
        if (event.shiftKey &&
            ((event.which == 37) || event.which == 38 || event.which == 39 || event.which == 40)) {
            $('.ellipsis').addClass('disable-select');

            //Review Doc for enable selection of text for docid
            if ($("#enableselectDom").length > 0) $("#enableselectDom").find("li span").removeClass("disable-select")
        }
        //anchor tag working on spacebar key
        if (event.keyCode == 32) {
            _catch_target = $(event.target);
            if ($(event.target).is("[role=button]") && !$(event.target).is(":button") && !$(event.target).hasClass("k-button")) {
                event.preventDefault();
                $(event.target).trigger("click");
                setTimeout(function () {
                    if ($(".action-div").length > 0 && _catch_target.attr("aria-haspopup") == undefined) {
                        if ($(".action-div").hasClass("open")) {
                            $(".action-div").removeClass("open");
                            $(".action-div").find("a").focus();
                        }
                    }
                }, 150);
            }
            if ($(event.target).is("[role=switch]")) {
                event.preventDefault();
                $(event.target).trigger("click");
            }
        }
    });


    //[App designer] Process steps bradcrumbs
    if ($(window).width() < 1280) {
        // change functionality for smaller screens
        $(".form-wizard-wrapper").prev(".grid-header").css({ width: "95%", "text-align": "left", "margin-left": "0", "margin-right": "0" });
    } else {
        // change functionality for larger screens
        $(".form-wizard-wrapper").prev(".grid-header").css({ width: "45%", "text-align": "left", "margin-left": "0", "margin-right": "0" });
        $(".form-wizard-wrapper").prev(".grid-header").children(".breadcrumb").css({ display: "inherit" });
    }
    $(window).on("resize", function () {

        if ($(window).width() < 1280) {
            // change functionality for smaller screens
            $(".form-wizard-wrapper").prev(".grid-header").css({ width: "95%", "text-align": "left", "margin-left": "auto", "margin-right": "auto" });
        } else {
            // change functionality for larger screens
            $(".form-wizard-wrapper").prev(".grid-header").css({ width: "45%", "text-align": "left", "margin-left": "0", "margin-right": "0" });
            $(".form-wizard-wrapper").prev(".grid-header").children(".breadcrumb").css({ display: "inherit" });
        }
    });

    /*common tooltip*/
    $('*[data-ara-title]').kendoTooltip({
        content: function (e) {
            var tooltipText = $(e.target[0]).attr("data-ara-title");
            return '<div>' + kendo.htmlEncode(tooltipText) + '</div>';
        },
        showAfter: 100,
        show: function (e) { tooltipCallout(); e.sender.popup.wrapper.css("z-index", "100001") }
    });

    //*****************notification modal popup
    //var showChar = 74;
    //var ellipsestext = "...";
    //var moretext = "See more";
    //var lesstext = "See less";
    //$('.more').each(function () {
    //    var content = $(this).html();

    //    if (content.length > showChar) {

    //        var c = content.substr(0, showChar);
    //        var h = content.substr(showChar - 1, content.length - showChar);

    //        var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

    //        $(this).html(html);
    //    }

    //});

    //$(".morelink").click(function () {
    //    if ($(this).hasClass("less")) {
    //        $(this).removeClass("less");
    //        $(this).html(moretext);
    //    } else {
    //        $(this).addClass("less");
    //        $(this).html(lesstext);
    //    }
    //    $(this).parent().prev().toggle();
    //    $(this).prev().toggle();
    //    return false;
    //});


    //var p_left = parent.$('.search-left').outerWidth(true);
    //var p_right = parent.$('.search-right').outerWidth(true) + 30;
    //resizeInput(p_left, p_right);
    //var inputSearch = parent.$('.search-left .select-label,.search-right .select-label');
    //var dropdown = $(inputSearch).find('select');
    //$.each(dropdown, function (i, v) {
    //    if (v.id) {
    //        parent.$("#" + v.id).data("kendoARADropdownlist").bind("change", function () {
    //            if (parent.$(".search-left").width() != p_left) {
    //                var p_left = parent.$('.search-left').outerWidth(true);
    //                resizeInput(p_left, "");
    //            }
    //            if (parent.$(".search-right").width() != p_right) {
    //                var p_right = parent.$('.search-right').outerWidth(true) + 10;
    //                resizeInput("", p_right);
    //            }
    //        });
    //    }
    //});

    //focus event custome code
    var elementsArray = ['.focusloop', '.dropdown-menu'];
    $.each(elementsArray, function (i) {
        $(document).on('keydown', elementsArray[i], function (e) {
            if (e.keyCode != 9)
                return;
            var loop = $(this).closest(elementsArray[i]);
            var firstTabbable = loop.find(':tabbable').first();
            var lastTabbable = loop.find(':tabbable').last();

            if (firstTabbable.is(e.target) && e.shiftKey == true) {
                e.preventDefault();
                lastTabbable.focus();
                return false;
            }

            if (lastTabbable.is(e.target) && e.shiftKey == false) {
                e.preventDefault();
                firstTabbable.focus();
                return false;
            }
            if ($(e.target).hasClass('k-radio') && ($(e.target).closest('div[class=form-group]').next().length == 0 && e.shiftKey == false) && ($('#ddlCodingFormName').length > 0 && $('#viewer-right-pane').hasClass("open") && $('#viewer-right-pane').is(":visible"))) {
                e.preventDefault();
                firstTabbable.focus();
                return false;
            }
        });
    });

    var rightDrawerElements = ['.rightdrawer-focusloop'];
    $.each(rightDrawerElements, function (i) {
        $(document).on('keydown', rightDrawerElements[i], function (e) {
            if (e.keyCode != 9)
                return;
            var loop = $(this).closest(rightDrawerElements[i]);
            var firstTabbable = loop.find(':tabbable').first();
            var lastTabbable = loop.find(':tabbable').last();

            if ($(".right-drawer").find("header").find(':tabbable').first()) {
                if (firstTabbable.is(e.target) && e.shiftKey == true) {
                    if ($(this).parents(".right-drawer").prev(".k-splitbar").length) {
                        $(this).parents(".right-drawer").prev(".k-splitbar").focus();
                    }
                    e.preventDefault();
                    return false;
                }
            }

            if (lastTabbable.is(e.target) && e.shiftKey == false) {
                e.preventDefault();
                firstTabbable.focus();
                return false;
            }
        });
        return false;
    });

    function handleFirstTab(e) {
        document.body.classList.add('user-is-tabbing');
        document.removeEventListener('keyup', handleFirstTab);
        document.addEventListener('mousedown', handleMouseDownOnce);
    }

    function handleMouseDownOnce() {
        document.body.classList.remove('user-is-tabbing');
        document.removeEventListener('mousedown', handleMouseDownOnce);
        document.addEventListener('keyup', handleFirstTab);
    }

    window.addEventListener('keyup', handleFirstTab);


    $(document).keyup(function (e) {
        //escape key press
        if (e.keyCode == 27) {
            $('.popover-body').hide();

            //ARApopover 
            if (kendo.widgetInstance($(document.activeElement).closest('div[data-role=popup]')) != undefined) {
                var vid = $(document.activeElement).closest('div[data-role=popup]')[0].id;
                $($(document.activeElement).closest('div[data-role=popup]')).data('kendoPopup').close();
                myString = vid.replace("_popover", '');
                $('#' + myString).focus();
            }
        }

        //spacebar key press event
        if (e.keyCode == 32) {
            //dropdown-menu open
            $(document.activeElement).siblings("dropdown-menu").focus();
            if (!$(document.activeElement).parents('.dropdown, .dropup').hasClass('open')) {
                $('.dropdown, .dropup').removeClass('open');
                $(document.activeElement).parents('.dropdown, .dropup').addClass('open');
                if ($(document.activeElement).siblings(".dropdown-menu").length) {
                    $(document.activeElement).siblings(".dropdown-menu").find(":tabbable").first().focus();
                }
            }
        }
    });

    $(document.body).keydown(function (e) {
        //colorpicker focusloop
        if ($(document.activeElement).closest('.k-flatcolorpicker').length) {
            $(document.activeElement).closest('.k-flatcolorpicker').addClass('focusloop');
        }

        //On ALT + W Key
        if (e.altKey && e.keyCode == 87) {

            var focusedElement = document.activeElement;

            if ($(focusedElement).parents(".k-grid").length) {
                var grid = kendo.widgetInstance($(focusedElement).parents(".k-grid"));
                grid.table.focus();
            }
            else if ($(focusedElement).parents(".k-treelist").length) {
                var TreeList = kendo.widgetInstance($(focusedElement).parents(".k-treelist"));
                TreeList.table.focus();
            }
            else if ($(focusedElement).parents(".k-panelbar").length) {
                $(focusedElement).parents(".k-panelbar").focus();
            }
            else if ($(focusedElement).parents(".k-listview").length) {
                $(focusedElement).parents(".k-listview").focus();
            }
        }
    });

    $(document).on("keydown", ".add-shortcut", function (e) {
        if (e.which === 13) {
            var currentElement = document.activeElement;
            $(currentElement).trigger("click");
            return true;
        }
    });

    var index = null;
    var index_sub = null;
    var index_sub_ul = null;


    $(document).on("keyup", ".arrowUpDown > li.dropdown > ul.dropdown-menu", function (e) {

        var items_sub_ul = $(".arrowUpDown > li.dropdown > ul.dropdown-menu > li > a");
        index_sub_ul = items_sub_ul.index(e.target);

        if (items_sub_ul.length === 0) {
            return;
        }

        if (e.which === 38) { // Up
            if (index_sub_ul > 0)
                index_sub_ul--;
            else if (index_sub_ul == 0)
                index_sub_ul = items_sub_ul.length - 1;
        }
        if (e.which === 40) { // Down
            if (index_sub_ul < items_sub_ul.length - 1)
                index_sub_ul++;
            else if (index_sub_ul == items_sub_ul.length - 1)
                index_sub_ul = 0;
        }
        if (index_sub_ul < 0) {
            index_sub_ul = 0;
        }

        if (e.keyCode == 27) { //ESC
            $(".arrowUpDown > li.dropdown > ul.dropdown-menu").css('display', 'none');
            $(document.activeElement).closest('.dropdown').find('a').focus();
            return false;
        }

        if (e.shiftKey && e.keyCode == 9) {
            if ($(document.activeElement).closest('.dropdown-menu')) {
                $(".dropdown").removeClass("open");
                $(".dropdown > a").attr("aria-expanded", "false");
                $(document.activeElement).closest('.dropdown-menu').prev().find('a').focus();
            }
            return false;
        }
        if (e.keyCode == 9) {
            if ($(document.activeElement).closest('.dropdown-menu')) {
                $(".dropdown").removeClass("open");
                $(".dropdown > a").attr("aria-expanded", "false");
                $(document.activeElement).closest('.dropdown-menu').next().find('a').focus();
            }
            return false;
        }

        items_sub_ul[index_sub_ul].focus();
        return false;
    });


    $(document).on("keyup", ".popoverlist li.dropdown", function (e) {

        if (e.keyCode == 13 || e.keyCode == 39 || e.keyCode == 32) {

            var items_sub = $(".arrowUpDown > li.dropdown > ul.dropdown-menu > li > a");
            index_sub = items_sub.index(e.target);

            if (items_sub.length === 0) {
                return;
            }

            if (index_sub < 0) {
                index_sub = 0;
            }

            var os = $(this).offset();
            var menu = $(e.currentTarget).find("ul.dropdown-menu");
            var width = menu.width() + 3;
            var height = menu.outerHeight();
            var bodyHeight = $(document.body).height();
            var posHeight = height + os.top;
            menu.css("left", +os.left - width + "px");
            if (posHeight > bodyHeight) {
                menu.css("top", "auto");
                menu.css("bottom", "30px");
            }
            else {
                menu.css("top", +os.top + "px");
                menu.css("bottom", "auto");
            }
            menu.css("display", "block");

            menu.find(":tabbable").first().focus();

            return false;
        }

    });


    $(document).on("keyup", ".arrowUpDown", function (e) {

        var items = $(".arrowUpDown > li > a");
        index = items.index(e.target);

        if (items.length === 0) {
            return;
        }

        if (e.which === 38) { // Up
            if (index > 0)
                index--;
            else if (index == 0)
                index = items.length - 1;
        }
        if (e.which === 40) { // Down
            if (index < items.length - 1)
                index++;
            else if (index == items.length - 1)
                index = 0;
        }
        if (index < 0) {
            index = 0;
        }

        if (e.keyCode == 27) { //ESC
            if ($("#_MorePage").data("kendoARAPopover") != undefined) {
                $("#_MorePage").data("kendoARAPopover").close();
                $("#MorePageLink").attr("aria-expanded", 'false');
                $("#_MorePage").removeClass("open");
                $("#MorePageLink").focus();
                return false;
            }
        }

        //if (e.shiftKey && e.keyCode == 9) {
        //    if ($(document.activeElement).closest('.dropdown')) {
        //        $(".dropdown").removeClass("open");
        //        $(".dropdown > a").attr("aria-expanded", "false");
        //        $(document.activeElement).closest('.dropdown').prev().find('a').focus();
        //    }
        //    return false;
        //}
        //if (e.keyCode == 9) {
        //    if ($(document.activeElement).closest('.dropdown')) {
        //        $(".dropdown").removeClass("open");
        //        $(".dropdown > a").attr("aria-expanded", "false");
        //        $(document.activeElement).closest('.dropdown').next().find('a').focus();
        //    }
        //    return false;
        //}

        items[index].focus();
    });

    $(document).on("keyup", ".dropdown-menu:not(.userprofile-menu):not(.support-mail):not(.notification-drawer)", function (e) {
        var $this = $(this);
        var $parent = $this.parent();
        var isActive = $parent.hasClass('open');
        if (!isActive && e.which != 27 || isActive && e.which == 27) {
            var activeDropdown = $(document.activeElement);
            if (e.which == 27) {
                var $children = $(activeDropdown).closest('.dropdown.open').children("a");
                $children.focus();
                var attrExpand = $children.attr('aria-expanded');
                if (typeof attrExpand !== typeof undefined && attrExpand !== false) {
                    $children.attr("aria-expanded", false);
                }
                $(activeDropdown).closest('.dropdown.open').removeClass('open');
                $(activeDropdown).closest('.dropdown-menu.open').removeClass('open');

                return false;
            }
        }


        var itemsLI = $(document.activeElement).closest('.dropdown-menu').find(" > li > a").filter(":visible");
        var items = $parent.find(itemsLI);
        var index = items.index(e.target);

        if (!$(items).length) {
            return;
        }
        if (e.which === 38) { // Up arrow
            if (index == 0) {
                index = items.length - 1;
                items[index].focus();
            } else {
                index--;
                items[index].focus();
            }
        }
        if (e.which === 40) { // Down arrow
            if (index == items.length - 1) {
                index = 0;
                items[index].focus();
            } else {
                index++;
                items[index].focus();
            }

        }
    });

    //viewer submenu dropdown
    $(document).on("keydown", ".subdropdown-btn", function (e) {
        if (e.which == 39 || e.which == 13 || e.which == 32) {
            $(this).unbind('click');
            e.preventDefault();
            $(this).parent().addClass('open');
            $(this).attr('aria-expanded', true);
            $(this).siblings(".dropdown-menu").find(":tabbable").first().focus();
        }
    });


    // main menubar
    $(document).on("keyup", ".pages-menu", function (e) {
        var pageItems = $(".pages-menu > li > a");
        var index = pageItems.index(e.target);

        if (pageItems.length === 0) {
            return;
        }
        if (e.which === 37 && index > 0) { // Up
            index--;
        }
        if (e.which === 39 && index < pageItems.length - 1) { // Down
            index++;
        }
        if (e.which === 38) { // Up
            return false;
        }
        if (e.which === 40) { // Down
            return false;
        }
        if (e.keyCode == 27) { //ESC
            if ($(document.activeElement).closest('.dropdown')) {
                $(".dropdown").removeClass("open");
                var attrExpand = $('.dropdown > a').attr('aria-expanded');
                if (typeof attrExpand !== typeof undefined && attrExpand !== false) {
                    $(".dropdown > a").attr("aria-expanded", "false");
                }
                $(document.activeElement).closest('.dropdown').find('a').focus();
            }
            return false;
        }

        if (e.keyCode == 13) {
            return false;
        }

        if (index < 0) {
            index = 0
        }

        if ($($(e.target).parent().parent()).hasClass("pages-menu")) {
            pageItems[index].focus();
        }
    });

    $(document).on("keydown", ".dropdown-menu.filter-search-dd", function (e) {
        if (e.keyCode == 27) {
            if ($(document.activeElement).parents(".filter-search-dd")) {
                $(".filter-search-dd").hide();
                $(".filter-search-dd").parent(".search-dropdown").children("a").focus();

            }
            return false;
        }
    });

    //Display Mode arrow key navigation
    $(document).on("keydown", "#ulDisplayMode", function (e) {
        var pageItems = $("#ulDisplayMode > li > input[name=chkDisplayMode]");
        var index = pageItems.index(e.target);

        if (pageItems.length === 0)
            return;
        if (e.which === 37) { // ArrowLeft
            if (index > 0)
                index--;
            else
                index = pageItems.length - 1
        }
        if (e.which === 39) { // ArrowRight
            if (index == pageItems.length - 1)
                index = 0;
            else
                index++;
        }
        if (index < 0)
            index = 0

        pageItems[index].focus();
        $(pageItems[index]).trigger("click");
        $(pageItems[index]).trigger("change");
    });

    $(".skip-content").on("click", function (e) {
        $('#frmPageLoad').contents().find('body >:not(#divTabs) :tabbable').first().focus();
    });

    $(document).on("keydown", ".k-popover-container > ul.action-list > li > a", function (e) {
        var items_sub_ul = $(".k-popover-container > ul.action-list > li > a");
        index_sub_ul = items_sub_ul.index(e.target);

        if (items_sub_ul.length === 0 || e.which != 38 && e.which != 40) {
            return;
        }

        if (e.which === 38) { // Up
            if (index_sub_ul > 0)
                index_sub_ul--;
            else if (index_sub_ul == 0)
                index_sub_ul = items_sub_ul.length - 1;
        }
        if (e.which === 40) { // Down
            if (index_sub_ul < items_sub_ul.length - 1)
                index_sub_ul++;
            else if (index_sub_ul == items_sub_ul.length - 1)
                index_sub_ul = 0;
        }
        if (index_sub_ul < 0) {
            index_sub_ul = 0;
        }

        items_sub_ul[index_sub_ul].focus();
        return false;
    });

    $(document).on("keydown", "#actionsShortcutlistView > a", function (e) {
        var items_sub_ul = $("#actionsShortcutlistView > a");
        index_sub_ul = items_sub_ul.index(e.target);

        if (items_sub_ul.length === 0 || e.which == 9 || e.which == 13) {
            return;
        }

        if (e.which === 38 || e.which == 37) { // Up, Left
            if (index_sub_ul > 0)
                index_sub_ul--;
            else if (index_sub_ul == 0)
                index_sub_ul = items_sub_ul.length - 1;
        }
        if (e.which === 40 || e.which == 39) { // Down, Right
            if (index_sub_ul < items_sub_ul.length - 1)
                index_sub_ul++;
            else if (index_sub_ul == items_sub_ul.length - 1)
                index_sub_ul = 0;
        }
        if (index_sub_ul < 0) {
            index_sub_ul = 0;
        }

        items_sub_ul[index_sub_ul].focus();
        return false;
    });

    $(document).on("mouseup", function (e) {
        if (!$(e.target).parents('table').is('table') || ($(e.target).parents('table').is('table') && $(e.target).parents('thead').is('thead'))) {
            if (window.top.frames.length >= 2 && window.top.frames[1].window.getSelection) {
                var browsers = kendo.support.browser;
                if (!browsers.mozilla && window.top.frames[1].window.getSelection().empty) {  // Chrome
                    var selection = window.top.frames[1].window.getSelection();
                    if (selection.anchorNode != undefined && selection.anchorNode != null && $(selection.anchorNode.parentNode).parents('table').attr('role') == 'grid') {
                        window.top.frames[1].window.getSelection().empty();
                    }
                    else {
                        return;
                    }
                } else if (window.top.frames[1].window.getSelection().removeAllRanges) {  // Firefox
                    var selection = window.top.frames[1].window.getSelection();
                    if (selection.anchorNode != undefined && selection.anchorNode != null && ($(selection.anchorNode.parentNode).parents('table').attr('role') == 'grid' || $(selection.anchorNode).parents('table').attr('role') == 'grid' || $(selection.anchorNode).attr('data-role') == 'aragridv3')) {
                        window.top.frames[1].window.getSelection().removeAllRanges();
                    }
                    else {
                        return;
                    }
                }
            }
        }
    });
});

/*Triggered Tooltip*/
function setToolTipTrigger(Hoveredlabel, TriggeredLable) {
    $(Hoveredlabel).on('mouseover', function (e) {
        $(this).find(TriggeredLable).triggerHandler('mouseover');
        e.stopPropagation();
    }).on('mouseout', function (e) {
        $(this).find(TriggeredLable).triggerHandler('mouseout');
        e.stopPropagation();
    }).find('.readonly-input').on('focus', function (e) {
        $(this).next(TriggeredLable).triggerHandler('mouseover');
        e.stopPropagation();
    }).on('blur', function (e) {
        $(this).next(TriggeredLable).triggerHandler('mouseout');
        e.stopPropagation();
    });
}
