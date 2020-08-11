'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var core = require('@blink-mind/core');
var React = require('react');
var rendererReact = require('@blink-mind/renderer-react');
var RichMarkDownEditor = _interopDefault(require('awehook-rich-markdown-editor'));
var debug = _interopDefault(require('debug'));
var styled = _interopDefault(require('styled-components'));
var MarkdownSerializer = _interopDefault(require('slate-md-serializer'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var log = debug('node:topic-content-editor');
var NodeContent = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", ";\n"], ["\n  ",
    ";\n"])), function (props) {
    return !props.readOnly &&
        "\n    // padding: 75px\n    // min-width: 150px\n    // min-height: 150px\n  ";
});
var RichTextEditor = /** @class */ (function (_super) {
    __extends(RichTextEditor, _super);
    function RichTextEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.onMouseDown = function (e) {
            e.stopPropagation();
        };
        _this.onMouseMove = function (e) {
            e.stopPropagation();
        };
        _this.rootRef = function (saveRef) { return function (ref) {
            saveRef(ref);
            _this.root = ref;
        }; };
        _this._handleClick = function (event) {
            var wasOutside = !_this.root.contains(event.target);
            wasOutside && _this.onClickOutSide(event);
        };
        _this.initState();
        return _this;
    }
    RichTextEditor.prototype.initState = function () {
        this.state = {
            content: this.getContent()
        };
    };
    RichTextEditor.prototype.getContent = function () {
        var block = this.getCustomizeProps().block;
        return block.data;
    };
    RichTextEditor.prototype.onChange = function (value) {
        this.setState({
            content: value
        });
    };
    RichTextEditor.prototype.getCustomizeProps = function () {
        return null;
    };
    RichTextEditor.prototype.componentDidMount = function () {
        document.addEventListener('click', this._handleClick);
    };
    RichTextEditor.prototype.componentWillUnmount = function () {
        document.removeEventListener('click', this._handleClick);
    };
    RichTextEditor.prototype.onClickOutSide = function (e) { };
    RichTextEditor.prototype.render = function () {
        var _a = this.props, topicKey = _a.topicKey, saveRef = _a.saveRef;
        var _b = this.getCustomizeProps(), readOnly = _b.readOnly, getRefKeyFunc = _b.getRefKeyFunc, placeholder = _b.placeholder;
        log('readOnly:', readOnly);
        var content = readOnly ? this.getContent() : this.state.content;
        if (content == null)
            return null;
        var key = getRefKeyFunc(topicKey);
        var _c = this, onMouseDown = _c.onMouseDown, onMouseMove = _c.onMouseMove;
        var richEditorProps = {
            editorValue: content,
            readOnly: readOnly,
            onChange: this.onChange.bind(this),
            placeholder: placeholder
        };
        var nodeContentProps = {
            key: key,
            ref: this.rootRef(saveRef(key)),
            readOnly: readOnly,
            onMouseDown: onMouseDown,
            onMouseMove: onMouseMove
        };
        return (React.createElement(NodeContent, __assign({}, nodeContentProps),
            React.createElement(RichMarkDownEditor, __assign({}, richEditorProps))));
    };
    return RichTextEditor;
}(rendererReact.BaseWidget));
var templateObject_1;

var TopicDescEditor = /** @class */ (function (_super) {
    __extends(TopicDescEditor, _super);
    function TopicDescEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopicDescEditor.prototype.initState = function () {
        _super.prototype.initState.call(this);
        var _a = this.props, controller = _a.controller, topicKey = _a.topicKey;
        var key = "topic-desc-data-" + topicKey;
        var value = this.state.content;
        controller.run('setTempValue', { key: key, value: value });
    };
    TopicDescEditor.prototype.getCustomizeProps = function () {
        var _a = this.props, model = _a.model, topicKey = _a.topicKey;
        var block = model.getTopic(topicKey).getBlock(core.BlockType.DESC).block;
        var readOnly = model.editingDescKey !== topicKey;
        //TODO
        var getRefKeyFunc = rendererReact.descEditorRefKey;
        return {
            block: block,
            readOnly: readOnly,
            getRefKeyFunc: getRefKeyFunc,
            placeholder: 'write topic notes here'
        };
    };
    TopicDescEditor.prototype.onChange = function (value) {
        var _a = this.props, controller = _a.controller, topicKey = _a.topicKey;
        var key = "topic-desc-data-" + topicKey;
        controller.run('setTempValue', { key: key, value: value });
        this.setState({
            content: value
        });
    };
    return TopicDescEditor;
}(RichTextEditor));

var markdownSerializer = new MarkdownSerializer();

function RichTextEditorPlugin() {
    return {
        renderTopicDescEditor: function (props) {
            return React.createElement(TopicDescEditor, __assign({}, props));
        },
        isBlockEmpty: function (props, next) {
            var block = props.block, controller = props.controller;
            if (block.type === core.BlockType.CONTENT || block.type === core.BlockType.DESC) {
                return (block.data == null ||
                    controller.run('serializeBlockData', props) === '');
            }
            return next();
        },
        serializeBlockData: function (props, next) {
            var block = props.block;
            if (block.type === core.BlockType.DESC) {
                return typeof block.data === 'string'
                    ? block.data
                    : markdownSerializer.serialize(block.data);
            }
            return next();
        }
    };
}

exports.default = RichTextEditorPlugin;
//# sourceMappingURL=main.js.map
