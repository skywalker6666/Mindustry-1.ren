'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var core = require('@blink-mind/core');
var React = require('react');
var plainSerializer = _interopDefault(require('slate-plain-serializer'));
var debug = _interopDefault(require('debug'));
var slateReact = require('slate-react');
var styled = _interopDefault(require('styled-components'));

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

var log = debug('node:text-editor');
var Content = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 6px;\n  background-color: ", ";\n  cursor: ", ";\n  min-width: 50px;\n"], ["\n  padding: 6px;\n  background-color: ", ";\n  cursor: ", ";\n  min-width: 50px;\n"])), function (props) { return (props.readOnly ? null : 'white'); }, function (props) { return (props.readOnly ? 'pointer' : 'text'); });
var SimpleTextEditor = /** @class */ (function (_super) {
    __extends(SimpleTextEditor, _super);
    function SimpleTextEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            content: null
        };
        _this.onMouseDown = function (e) {
            e.stopPropagation();
        };
        _this.onMouseMove = function (e) {
            // log('onMouseMove');
            // e.stopPropagation();
        };
        _this.onKeyDown = function (e) { };
        _this._handleClick = function (event) {
            var wasOutside = !_this.root.contains(event.target);
            wasOutside && _this.onClickOutSide(event);
        };
        _this.rootRef = function (saveRef) { return function (ref) {
            saveRef(ref);
            _this.root = ref;
        }; };
        _this.initState();
        return _this;
    }
    SimpleTextEditor.prototype.onChange = function (_a) {
        var value = _a.value;
        log('onChange', value);
        this.setState({ content: value });
    };
    SimpleTextEditor.prototype.componentDidMount = function () {
        var readOnly = this.props.readOnly;
        if (readOnly)
            return;
        document.addEventListener('click', this._handleClick);
    };
    SimpleTextEditor.prototype.componentWillUnmount = function () {
        var readOnly = this.props.readOnly;
        if (readOnly)
            return;
        document.removeEventListener('click', this._handleClick);
    };
    SimpleTextEditor.prototype.onClickOutSide = function (e) { };
    SimpleTextEditor.prototype.getCustomizeProps = function () {
        return null;
    };
    SimpleTextEditor.prototype.getContent = function () {
        var block = this.getCustomizeProps().block;
        var content = block.data;
        if (content == null)
            return null;
        if (typeof content === 'string') {
            content = plainSerializer.deserialize(content);
        }
        return content;
    };
    SimpleTextEditor.prototype.initState = function () {
        var content = this.getContent();
        this.state = {
            content: content
        };
    };
    SimpleTextEditor.prototype.render = function () {
        var _a = this.props, topicKey = _a.topicKey, saveRef = _a.saveRef;
        var _b = this.getCustomizeProps(), readOnly = _b.readOnly, getRefKeyFunc = _b.getRefKeyFunc, placeholder = _b.placeholder, style = _b.style;
        log(readOnly);
        var key = getRefKeyFunc(topicKey);
        var content = readOnly ? this.getContent() : this.state.content;
        var _c = this, onMouseDown = _c.onMouseDown, onMouseMove = _c.onMouseMove, onKeyDown = _c.onKeyDown;
        var editorProps = {
            value: content,
            readOnly: readOnly,
            onChange: this.onChange.bind(this),
            placeholder: placeholder,
            style: style
        };
        var contentProps = {
            key: key,
            readOnly: readOnly,
            ref: this.rootRef(saveRef(key)),
            onMouseDown: onMouseDown,
            onMouseMove: onMouseMove,
            onKeyDown: onKeyDown
        };
        return (React.createElement(Content, __assign({}, contentProps),
            React.createElement(slateReact.Editor, __assign({}, editorProps, { autoFocus: true }))));
    };
    return SimpleTextEditor;
}(React.PureComponent));
var templateObject_1;

var log$1 = debug('node:topic-content-editor');
function contentEditorRefKey(key) {
    return "content-editor-" + key;
}
var TopicContentEditor = /** @class */ (function (_super) {
    __extends(TopicContentEditor, _super);
    function TopicContentEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.onKeyDown = function (e) {
            if (e.nativeEvent.ctrlKey && e.nativeEvent.code === 'Enter') {
                _this.save();
            }
        };
        return _this;
    }
    TopicContentEditor.prototype.getCustomizeProps = function () {
        var _a = this.props, model = _a.model, topicKey = _a.topicKey, readOnly = _a.readOnly;
        var block = model.getTopic(topicKey).getBlock(core.BlockType.CONTENT).block;
        var getRefKeyFunc = contentEditorRefKey;
        var style = {
            whiteSpace: 'pre'
        };
        return {
            block: block,
            readOnly: readOnly,
            getRefKeyFunc: getRefKeyFunc,
            placeholder: 'new',
            style: style
        };
    };
    TopicContentEditor.prototype.onClickOutSide = function (e) {
        log$1('onClickOutSide');
        this.save();
    };
    TopicContentEditor.prototype.save = function () {
        var _a = this.props, model = _a.model, topicKey = _a.topicKey;
        var readOnly = model.editingContentKey !== topicKey;
        if (readOnly)
            return;
        var controller = this.props.controller;
        controller.run('operation', __assign(__assign({}, this.props), { opType: core.OpType.SET_TOPIC_BLOCK, blockType: core.BlockType.CONTENT, data: this.state.content, focusMode: core.FocusMode.NORMAL }));
    };
    return TopicContentEditor;
}(SimpleTextEditor));

var log$2 = debug('node:topic-desc-editor');
function descEditorRefKey(key) {
    return "desc-editor-" + key;
}
var TopicDescEditor = /** @class */ (function (_super) {
    __extends(TopicDescEditor, _super);
    function TopicDescEditor(props) {
        var _this = _super.call(this, props) || this;
        log$2('constructor');
        return _this;
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
        var getRefKeyFunc = descEditorRefKey;
        return {
            block: block,
            readOnly: readOnly,
            getRefKeyFunc: getRefKeyFunc,
            placeholder: 'write topic notes here'
        };
    };
    TopicDescEditor.prototype.onChange = function (_a) {
        var value = _a.value;
        log$2('onChange');
        var _b = this.props, controller = _b.controller, topicKey = _b.topicKey, model = _b.model;
        var readOnly = model.editingDescKey !== topicKey;
        if (readOnly)
            return;
        var key = "topic-desc-data-" + topicKey;
        controller.run('setTempValue', { key: key, value: value });
        this.setState({
            content: value
        });
    };
    return TopicDescEditor;
}(SimpleTextEditor));

function SimpleTextEditorPlugin() {
    return {
        getTopicTitle: function (props) {
            var model = props.model, controller = props.controller, topicKey = props.topicKey, maxLength = props.maxLength;
            var topic = model.getTopic(topicKey);
            var block = topic.getBlock(core.BlockType.CONTENT).block;
            var text = controller.run('serializeBlockData', __assign(__assign({}, props), { block: block }));
            if (maxLength != null) {
                text =
                    text.length > maxLength ? text.substr(0, maxLength) + '...' : text;
            }
            return text;
        },
        renderTopicContentEditor: function (props) {
            return React.createElement(TopicContentEditor, __assign({}, props));
        },
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
            if (block.type === core.BlockType.CONTENT || block.type === core.BlockType.DESC) {
                return typeof block.data === 'string'
                    ? block.data
                    : plainSerializer.serialize(block.data);
            }
            return next();
        }
    };
}

exports.default = SimpleTextEditorPlugin;
//# sourceMappingURL=main.js.map
