/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/bootstrap-show-modal
 * License: MIT, see file 'LICENSE'
 */

(function ($) {
    "use strict"

    var i = 0
    function Modal(props) {
        this.props = {
            title: "", // the dialog title html
            body: "", // the dialog body html
            footer: "", // the dialog footer html (mainly used for buttons)
            dataBackdrop:"static",
            dataKeyboard:"false",
            modalBodyClass: 'modal-response',
            modalFooterClass: '',
            crossBtn: '',
            modalClass: "right offCanvasModal", // Additional css for ".modal", "fade" for fade effect
            modalDialogClass: "", // Additional css for ".modal-dialog", like "modal-lg" or "modal-sm" for sizing
            options: null, // The Bootstrap modal options as described here: https://getbootstrap.com/docs/4.0/components/modal/#options
            // Events:
            onCreate: null, // Callback, called after the modal was created
            onDispose: null, // Callback, called after the modal was disposed
            onSubmit: null, // Callback of $.showConfirm(), called after yes or no was pressed
        
            modalSkeleton: "",
            modalSkeleton1 : '<div id="dom-modal-skeleton" class="bg-white dom-modal-skeleton"><div class="custom-skeleton row mb-2"><div class="col-12 col-md-3"><div class="skeleton-loader title mt-3"></div></div><div class="col-12 col-md-8"><div class="d-flex"><div class="skeleton-loader mr-3 radio-btn-blk"></div><div class="skeleton-loader radio-btn-blk"></div></div></div></div><div class="custom-skeleton row align-items-center mb-2"><div class="col-12 col-md-3"><div class="skeleton-loader title"></div></div><div class="col-12 col-md-4"><div class="skeleton-loader description"></div></div></div><div class="row bg-white"><div class="col-md-12"><table class="table border border-light table-hover"><thead class="custom-skeleton"><tr class="grid-table-row"><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th class="d-md-table-cell"><div class="skeleton-loader description my-0 ml-md-auto"></div></th></tr></thead><tbody class="custom-skeleton"><tr class="grid-table-row"><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th class="d-md-table-cell"><div class="skeleton-loader description my-0 ml-md-auto"></div></th></tr><tr class="grid-table-row"><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th class="d-md-table-cell"><div class="skeleton-loader description my-0 ml-md-auto"></div></th></tr><tr class="grid-table-row"><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th class="d-md-table-cell"><div class="skeleton-loader description my-0 ml-md-auto"></div></th></tr><tr class="grid-table-row"><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th class="d-md-table-cell"><div class="skeleton-loader description my-0 ml-md-auto"></div></th></tr><tr class="grid-table-row"><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th><div class="skeleton-loader description my-0"></div></th><th class="d-md-table-cell"><div class="skeleton-loader description my-0 ml-md-auto"></div></th></tr></tbody></table></div></div></div>',
            modalSkeleton2: '<div class="custom-skeleton row align-items-center mb-2"><div class="col-12 col-md-4"><div class="skeleton-loader title"></div></div><div class="col-12 col-md-8"><div class="skeleton-loader description"></div></div></div><div class="custom-skeleton row align-items-center mb-2"><div class="col-12 col-md-4"><div class="skeleton-loader title"></div></div><div class="col-12 col-md-8"><div class="skeleton-loader description"></div></div></div><div class="custom-skeleton row align-items-center mb-2"><div class="col-12 col-md-4"><div class="skeleton-loader title"></div></div><div class="col-12 col-md-8"><div class="skeleton-loader description"></div></div></div><div class="custom-skeleton row align-items-center mb-2"><div class="col-12 col-md-4"><div class="skeleton-loader title"></div></div><div class="col-12 col-md-8"><div class="skeleton-loader description"></div></div></div><div class="custom-skeleton row align-items-center mb-2"><div class="col-12 col-md-4"><div class="skeleton-loader title"></div></div><div class="col-12 col-md-8"><div class="skeleton-loader description"></div></div></div><div class="custom-skeleton row align-items-center mb-2"><div class="col-12 col-md-4"><div class="skeleton-loader title"></div></div><div class="col-12 col-md-8"><div class="skeleton-loader description"></div></div></div><div class="custom-skeleton row align-items-center mb-2"><div class="col-12 col-md-4"><div class="skeleton-loader title"></div></div><div class="col-12 col-md-8"><div class="skeleton-loader description"></div></div></div><div class="custom-skeleton row align-items-center mb-2"><div class="col-12 col-md-4"><div class="skeleton-loader title"></div></div><div class="col-12 col-md-8"><div class="skeleton-loader description"></div></div></div><div class="custom-skeleton row align-items-center mb-2"><div class="col-12 col-md-4"><div class="skeleton-loader title"></div></div><div class="col-12 col-md-8"><div class="skeleton-loader description"></div></div></div><div class="custom-skeleton row align-items-center mb-2"><div class="col-12 col-md-4"><div class="skeleton-loader title"></div></div><div class="col-12 col-md-8"><div class="skeleton-loader description"></div></div></div>'
        }
        Object.assign(this.props, props)
        this.id = "bootstrap-show-modal-" + i
        i++
        this.show()
    }

    Modal.prototype.createContainerElement = function () {
        var self = this
        this.element = document.createElement("div")
        this.element.id = this.id
        this.element.setAttribute("class", "modal onDomModal fade " + this.props.modalClass)
        this.element.setAttribute("tabindex", "-1")
        this.element.setAttribute("role", "dialog")
        this.element.setAttribute("data-backdrop", this.props.dataBackdrop)
        this.element.setAttribute("data-keyboard", this.props.dataKeyboard)
        this.element.setAttribute("aria-labelledby", this.id)
        this.element.innerHTML = '<div class="modal-dialog ' + this.props.modalDialogClass + '" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title"></h5>' +
            '<button type="button" class="close close-dom-modal ' + this.props.crossBtn + '" data-dismiss="modal" aria-label="Close">' +
            '<span class="icon-Cross_2 cross-btn" aria-hidden="true"></span>' +
            '</button>' +
            '</div>' +
            '<div class="modal-body ' + this.props.modalBodyClass + '"></div>' +
            '<div class="modal-footer ' + this.props.modalFooterClass + '"></div>' +
            '</div>' +
            '</div>'
        document.body.appendChild(this.element)
        this.titleElement = this.element.querySelector(".modal-title")
        this.bodyElement = this.element.querySelector(".modal-body")
        this.footerElement = this.element.querySelector(".modal-footer")
        $(this.element).on('hidden.bs.modal', function () {
            self.dispose()
        })
    }

    Modal.prototype.show = function () {
        if (!this.element) {
            this.createContainerElement()
            if (this.props.options) {
                $(this.element).modal(this.props.options)
            } else {
                $(this.element).modal()
            }
        } else {
            $(this.element).modal('show')
        }
        if (this.props.title) {
            $(this.titleElement).show()
            this.titleElement.innerHTML = this.props.title
        } else {
            $(this.titleElement).hide()
        }
        if (this.props.body) {
            $(this.bodyElement).show()
            this.bodyElement.innerHTML = this.props.body
        } 
        else if (this.props.modalSkeleton) {
            $(this.bodyElement).show()
            if(this.props.modalSkeleton == "type1") {
                this.bodyElement.innerHTML = this.props.modalSkeleton1
            }

            else if(this.props.modalSkeleton == "type2") {
                this.bodyElement.innerHTML = this.props.modalSkeleton2
            }

            else if(this.props.modalSkeleton == "type3") {
                this.bodyElement.innerHTML = this.props.modalSkeleton3
            }

            else {
                this.bodyElement.innerHTML = this.props.modalSkeleton
            }
        }else {
            $(this.bodyElement).hide()
        }
        if (this.props.footer) {
            $(this.footerElement).show()
            this.footerElement.innerHTML = this.props.footer
        } else {
            $(this.footerElement).hide()
        }
    }

    Modal.prototype.hide = function () {
        $(this.element).modal('hide')
    }

    Modal.prototype.dispose = function () {
        $(this.element).modal('dispose')
        document.body.removeChild(this.element)
        if (this.props.onDispose) {
            this.props.onDispose(this)
        }
    }

    $.extend({
        showModal: function (props) {
            return new Modal(props)
        }
    })

}(jQuery))