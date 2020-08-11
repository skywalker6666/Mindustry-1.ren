'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var core = require('@blink-mind/core');
var rendererReact = require('@blink-mind/renderer-react');
var core$1 = require('@blueprintjs/core');
var React = require('react');
var styled = _interopDefault(require('styled-components'));
var immutable = require('immutable');
var select = require('@blueprintjs/select');

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

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var FOCUS_MODE_SET_REFERENCE_TOPICS = 'FOCUS_MODE_SET_REFERENCE_TOPICS';
// 添加引用的Topic
var OP_TYPE_START_SET_REFERENCE_TOPICS = 'OP_TYPE_START_SET_REFERENCE_TOPICS';
var OP_TYPE_SET_REFERENCE_TOPICS = 'OP_TYPE_SET_REFERENCE_TOPICS';
var EXT_DATA_KEY_TOPIC_REFERENCE = 'TOPIC_REFERENCE';
var EXT_KEY_TOPIC_REFERENCE = 'EXT_KEY_TOPIC_REFERENCE';

var Root = styled(rendererReact.ZIndex)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  left: calc(50% - 150px);\n  top: 30px;\n  width: 300px;\n  background: white;\n  padding: 10px;\n  user-select: none;\n"], ["\n  position: absolute;\n  left: calc(50% - 150px);\n  top: 30px;\n  width: 300px;\n  background: white;\n  padding: 10px;\n  user-select: none;\n"])));
var Title = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-bottom: 10px;\n"], ["\n  margin-bottom: 10px;\n"])));
function AddReferenceTopicPanel(props) {
    var zIndex = props.zIndex, controller = props.controller, topicKey = props.topicKey;
    var onClickCancel = function (e) {
        controller.run('clearSelectedReferenceKeys', props);
        controller.run('enableOperation', props);
        controller.run('operation', __assign(__assign({}, props), { opType: core.OpType.SET_FOCUS_MODE, focusMode: core.FocusMode.NORMAL }));
    };
    var onClickConfirm = function (e) {
        var referenceKeys = controller.run('getSelectedReferenceKeys', props);
        controller.run('enableOperation', props);
        controller.run('operation', __assign(__assign({}, props), { opArray: [
                {
                    opType: OP_TYPE_SET_REFERENCE_TOPICS,
                    topicKey: topicKey,
                    referenceKeys: referenceKeys
                },
                {
                    opType: core.OpType.FOCUS_TOPIC,
                    topicKey: topicKey,
                    focusMode: core.FocusMode.NORMAL
                }
            ] }));
        controller.run('clearSelectedReferenceKeys', props);
    };
    return (React.createElement(Root, { zIndex: zIndex },
        React.createElement(Title, null, "Please select the topics you want to reference. After selection, click the confirm button."),
        React.createElement(rendererReact.Flex, { justifyContent: 'space-around' },
            React.createElement(core$1.Button, { onClick: onClickConfirm }, "Confirm"),
            React.createElement(core$1.Button, { onClick: onClickCancel }, "Cancel"))));
}
var templateObject_1, templateObject_2;

var defaultReferenceRecord = {
    keyList: immutable.List(),
    dataMap: immutable.Map()
};
var ReferenceRecord = /** @class */ (function (_super) {
    __extends(ReferenceRecord, _super);
    function ReferenceRecord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ReferenceRecord.prototype, "keyList", {
        get: function () {
            return this.get('keyList');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReferenceRecord.prototype, "dataMap", {
        get: function () {
            return this.get('dataMap');
        },
        enumerable: true,
        configurable: true
    });
    return ReferenceRecord;
}(immutable.Record(defaultReferenceRecord)));
var defaultExtDataReferenceRecord = {
    reference: immutable.Map()
};
var ExtDataReference = /** @class */ (function (_super) {
    __extends(ExtDataReference, _super);
    function ExtDataReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ExtDataReference.prototype, "reference", {
        get: function () {
            return this.get('reference');
        },
        enumerable: true,
        configurable: true
    });
    ExtDataReference.prototype.getReferenceKeys = function (topicKey) {
        if (this.reference.has(topicKey)) {
            return this.reference.get(topicKey).keyList.toArray();
        }
        return [];
    };
    ExtDataReference.prototype.getReferencedKeys = function (topicKey) {
        var res = [];
        this.reference.forEach(function (v, k) {
            if (v.keyList.includes(topicKey)) {
                res.push(k);
            }
        });
        return res;
    };
    return ExtDataReference;
}(immutable.Record(defaultExtDataReferenceRecord)));

// TODO 能否优化这个函数的写法
function setReferenceTopicKeys(_a) {
    var model = _a.model, topicKey = _a.topicKey, referenceKeys = _a.referenceKeys;
    var extData = model.getExtDataItem(EXT_DATA_KEY_TOPIC_REFERENCE, ExtDataReference);
    var referenceRecord = extData.reference.get(topicKey) || new ReferenceRecord();
    referenceRecord = referenceRecord.set('keyList', immutable.List(referenceKeys));
    extData = extData.setIn(['reference', topicKey], referenceRecord);
    model = model.setIn(['extData', EXT_DATA_KEY_TOPIC_REFERENCE], extData);
    return model;
}

var Root$1 = styled.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  display: flex;\n  width: 380px;\n  margin: 10px;\n  justify-content: center;\n  align-items: center;\n"], ["\n  display: flex;\n  width: 380px;\n  margin: 10px;\n  justify-content: center;\n  align-items: center;\n"])));
var Content = styled.div(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  width: 300px;\n  text-decoration: underline;\n  cursor: pointer;\n"], ["\n  width: 300px;\n  text-decoration: underline;\n  cursor: pointer;\n"])));
var ButtonPlace = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 80px;\n"], ["\n  width: 80px;\n"])));
function ReferenceTopicThumbnail(props) {
    var controller = props.controller, refKey = props.refKey, refType = props.refType, removeHandler = props.removeHandler;
    var _a = __read(React.useState(false), 2), deleteConfirm = _a[0], setDeleteConfirm = _a[1];
    var onClick = function (e) {
        e.stopPropagation();
        controller.run('focusTopicAndMoveToCenter', __assign(__assign({}, props), { topicKey: refKey }));
    };
    var onClickRemove = function (e) {
        setDeleteConfirm(true);
    };
    var content = controller.getValue(rendererReact.PropKey.TOPIC_TITLE, __assign(__assign({}, props), { topicKey: refKey, maxLength: 100 }));
    var deleteAlertProps = {
        isOpen: deleteConfirm,
        cancelButtonText: 'cancel',
        onConfirm: function (e) {
            removeHandler(e);
        },
        onCancel: function (e) {
            setDeleteConfirm(false);
        },
        onClose: function (e) {
            setDeleteConfirm(false);
        }
    };
    return (React.createElement(Root$1, null,
        React.createElement(Content, { onClick: onClick }, content),
        React.createElement(ButtonPlace, null, refType === 'reference' && (React.createElement(React.Fragment, null,
            React.createElement(core$1.Button, { onClick: onClickRemove }, "Remove"),
            React.createElement(core$1.Alert, __assign({}, deleteAlertProps),
                React.createElement("p", null, "Are you confirm to remove this reference?")))))));
}
var templateObject_1$1, templateObject_2$1, templateObject_3;

var Root$2 = styled.div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject([""], [""])));
var Group = styled.div(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  padding: 10px;\n"], ["\n  padding: 10px;\n"])));
var GroupList = styled.div(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  max-height: 200px;\n  overflow: auto;\n"], ["\n  max-height: 200px;\n  overflow: auto;\n"])));
var GroupTitle = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 20px;\n  color: #106ba3;\n"], ["\n  font-size: 20px;\n  color: #106ba3;\n"])));
var GotoBtn = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  text-decoration: underline;\n  color: #106ba3;\n  cursor: pointer;\n"], ["\n  text-decoration: underline;\n  color: #106ba3;\n  cursor: pointer;\n"])));
function ReferenceTopicList(props) {
    var topicKey = props.topicKey, controller = props.controller, model = props.model;
    var extData = model.extData.get(EXT_DATA_KEY_TOPIC_REFERENCE);
    var removeReference = function (refKey) { return function (e) {
        e.stopPropagation();
        var keyList = extData.reference.get(topicKey).keyList;
        controller.run('operation', __assign(__assign({}, props), { opArray: [
                {
                    opType: OP_TYPE_SET_REFERENCE_TOPICS,
                    topicKey: topicKey,
                    focusMode: core.FocusMode.NORMAL,
                    referenceKeys: keyList.delete(keyList.indexOf(refKey)).toArray()
                }
            ] }));
    }; };
    var referenceKeys = extData.getReferenceKeys(topicKey);
    var referenceGroup = referenceKeys.length === 0 ? null : (React.createElement(Group, null,
        React.createElement(GroupTitle, null, "Reference Topics:"),
        React.createElement(GroupList, null, referenceKeys.map(function (key) {
            var thumbProps = __assign(__assign({}, props), { key: key, refKey: key, refType: 'reference', removeHandler: removeReference(key) });
            //@ts-ignore
            return React.createElement(ReferenceTopicThumbnail, __assign({}, thumbProps));
        }))));
    var referencedKeys = extData.getReferencedKeys(topicKey);
    var referencedGroup = referencedKeys.length === 0 ? null : (React.createElement(Group, null,
        React.createElement(GroupTitle, null, "Referenced Topics:"),
        React.createElement(GroupList, null, referencedKeys.map(function (key) {
            var thumbProps = __assign(__assign({}, props), { key: key, refKey: key, refType: 'referenced' });
            //@ts-ignore
            return React.createElement(ReferenceTopicThumbnail, __assign({}, thumbProps));
        }))));
    var onClickGotoOriginTopic = function (e) {
        e.stopPropagation();
        controller.run('focusTopicAndMoveToCenter', props);
    };
    var currentTopic = model.focusKey !== topicKey && (React.createElement(Group, null,
        React.createElement(GotoBtn, { onClick: onClickGotoOriginTopic }, "Goto Origin Topic")));
    return (React.createElement(Root$2, { onMouseDown: rendererReact.cancelEvent },
        referenceGroup,
        referencedGroup,
        currentTopic));
}
var templateObject_1$2, templateObject_2$2, templateObject_3$1, templateObject_4, templateObject_5;

function TopicExtReference(props) {
    var model = props.model, topicKey = props.topicKey;
    var extData = model.extData.get(EXT_DATA_KEY_TOPIC_REFERENCE) || new ExtDataReference();
    var refRecord = extData.reference.get(topicKey);
    var referencedKeys = [];
    extData.reference.forEach(function (v, k) {
        if (v.keyList.includes(topicKey))
            referencedKeys.push(k);
    });
    if ((refRecord == null || refRecord.keyList.size === 0) &&
        referencedKeys.length === 0)
        return null;
    var iconProps = {
        className: rendererReact.iconClassName('reference'),
        tabIndex: -1
    };
    var icon = React.createElement(rendererReact.TopicBlockIcon, __assign({}, iconProps));
    var tooltipContent = React.createElement(ReferenceTopicList, __assign({}, props));
    var tooltipProps = {
        autoFocus: false,
        content: tooltipContent,
        target: icon,
        interactionKind: core$1.PopoverInteractionKind.CLICK,
        hoverOpenDelay: 500
    };
    return React.createElement(core$1.Popover, __assign({}, tooltipProps));
}

function TopicReferenceCheckbox(props) {
    var topicKey = props.topicKey, selectedTopicKeys = props.selectedTopicKeys;
    var a = selectedTopicKeys.has(topicKey);
    var _a = __read(React.useState(a), 2), checked = _a[0], setChecked = _a[1];
    var checkboxProps = {
        checked: checked,
        onChange: function () {
            if (selectedTopicKeys.has(topicKey)) {
                selectedTopicKeys.delete(topicKey);
            }
            else {
                selectedTopicKeys.add(topicKey);
            }
            setChecked(!checked);
        }
    };
    return React.createElement(rendererReact.StyledCheckbox, __assign({}, checkboxProps));
}

function TopicReferencePlugin() {
    var selectedTopicKeys = new Set();
    function startSetReferenceTopics(_a) {
        var model = _a.model, topicKey = _a.topicKey;
        var extData = model.getExtDataItem(EXT_DATA_KEY_TOPIC_REFERENCE, ExtDataReference);
        selectedTopicKeys = new Set(extData.getReferenceKeys(topicKey));
        model = core.ModelModifier.focusTopic({
            model: model,
            topicKey: topicKey,
            focusMode: FOCUS_MODE_SET_REFERENCE_TOPICS
        });
        return model;
    }
    return {
        customizeTopicContextMenu: function (props, next) {
            var controller = props.controller;
            function onClickSetReferenceTopics(e) {
                controller.run('operation', __assign(__assign({}, props), { opType: OP_TYPE_START_SET_REFERENCE_TOPICS }));
                controller.run('disableOperation', __assign(__assign({}, props), { whiteList: [core.OpType.TOGGLE_COLLAPSE] }));
            }
            return (React.createElement(React.Fragment, null,
                next(),
                React.createElement(core$1.MenuDivider, null),
                React.createElement(core$1.MenuItem, { key: EXT_KEY_TOPIC_REFERENCE, icon: rendererReact.Icon('reference'), text: "Set Reference Topics", onClick: onClickSetReferenceTopics })));
        },
        getOpMap: function (props, next) {
            var opMap = next();
            opMap.set(OP_TYPE_START_SET_REFERENCE_TOPICS, startSetReferenceTopics);
            opMap.set(OP_TYPE_SET_REFERENCE_TOPICS, setReferenceTopicKeys);
            return opMap;
        },
        beforeOpFunction: function (props, next) {
            var model = next();
            var opType = props.opType, topicKey = props.topicKey;
            // 注意是在beforeOpFunction里面操作
            if (opType === core.OpType.DELETE_TOPIC &&
                topicKey !== model.editorRootTopicKey) {
                var allDeleteKeys = core.getAllSubTopicKeys(model, topicKey);
                allDeleteKeys.push(topicKey);
                var extData_1 = model.getExtDataItem(EXT_DATA_KEY_TOPIC_REFERENCE, ExtDataReference);
                var reference_1 = extData_1.reference;
                // 注意这里要处理所有被删除的Key
                allDeleteKeys.forEach(function (deleteKey) {
                    var referencedKeys = extData_1.getReferencedKeys(deleteKey);
                    // 处理被引用的部分
                    reference_1 = reference_1.withMutations(function (reference) {
                        referencedKeys.forEach(function (v) {
                            reference.updateIn([v, 'keyList'], function (keyList) {
                                return keyList.delete(keyList.indexOf(deleteKey));
                            });
                        });
                    });
                    // 处理引用的部分
                    if (reference_1.has(deleteKey)) {
                        reference_1 = reference_1.delete(deleteKey);
                    }
                });
                extData_1 = extData_1.set('reference', reference_1);
                model = model.setIn(['extData', EXT_DATA_KEY_TOPIC_REFERENCE], extData_1);
            }
            return model;
        },
        renderDiagramCustomize: function (props, next) {
            var model = props.model, controller = props.controller;
            var zIndex = controller.getValue(rendererReact.PropKey.DIAGRAM_CUSTOMIZE_BASE_Z_INDEX) + 2;
            var res = next();
            if (model.focusMode === FOCUS_MODE_SET_REFERENCE_TOPICS) {
                var panelProps = __assign(__assign({}, props), { zIndex: zIndex, topicKey: model.focusKey, key: 'AddReferenceTopicPanel' });
                res.push(React.createElement(AddReferenceTopicPanel, __assign({}, panelProps)));
            }
            return res;
        },
        renderTopicContentOthers: function (props, next) {
            var model = props.model, topicKey = props.topicKey, controller = props.controller;
            var res = next();
            res.push(controller.run('renderTopicExtReference', __assign(__assign({}, props), { key: EXT_KEY_TOPIC_REFERENCE + '-icon' })));
            if (model.focusMode === FOCUS_MODE_SET_REFERENCE_TOPICS &&
                model.focusKey !== topicKey) {
                var checkBoxProps = __assign(__assign({}, props), { key: 'checkbox', selectedTopicKeys: selectedTopicKeys });
                var checkbox = React.createElement(TopicReferenceCheckbox, __assign({}, checkBoxProps));
                res.push(checkbox);
            }
            return res;
        },
        renderTopicExtReference: function (props, next) {
            return React.createElement(TopicExtReference, __assign({}, props));
        },
        clearSelectedReferenceKeys: function () {
            selectedTopicKeys.clear();
        },
        getSelectedReferenceKeys: function () {
            return Array.from(selectedTopicKeys);
        },
        //TODO
        deserializeExtDataItem: function (props, next) {
            var extDataKey = props.extDataKey, extDataItem = props.extDataItem;
            if (extDataKey === EXT_DATA_KEY_TOPIC_REFERENCE) {
                var extDataReference = new ExtDataReference();
                var _loop_1 = function (key) {
                    var item = extDataItem.reference[key];
                    var referenceRecord = new ReferenceRecord({
                        keyList: immutable.List(item.keyList),
                        dataMap: immutable.Map(item.dataMap)
                    });
                    extDataReference = extDataReference.update('reference', function (reference) {
                        return reference.set(key, referenceRecord);
                    });
                };
                for (var key in extDataItem.reference) {
                    _loop_1(key);
                }
                return extDataReference;
            }
            return next();
        }
    };
}

var NavOmniBar = select.Omnibar.ofType();
var StyledNavOmniBar = styled(NavOmniBar)(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  top: 20%;\n  left: 25% !important;\n  width: 50% !important;\n"], ["\n  top: 20%;\n  left: 25% !important;\n  width: 50% !important;\n"])));
var TopicTitle = styled.div(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  margin: 0 5px;\n  padding: 10px 5px;\n  width: 100%;\n  font-size: 16px;\n  cursor: pointer;\n  &:hover {\n    background: #e3e8ec;\n  }\n"], ["\n  margin: 0 5px;\n  padding: 10px 5px;\n  width: 100%;\n  font-size: 16px;\n  cursor: pointer;\n  &:hover {\n    background: #e3e8ec;\n  }\n"])));
var StyledPopover = styled(core$1.Popover)(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  display: block;\n"], ["\n  display: block;\n"])));
var Tip = styled.div(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n  padding: 10px;\n  font-size: 16px;\n  //max-width: 800px;\n  //max-height: 600px;\n  overflow: auto;\n"], ["\n  padding: 10px;\n  font-size: 16px;\n  //max-width: 800px;\n  //max-height: 600px;\n  overflow: auto;\n"])));
var TipContent = styled.div(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject(["\n  white-space: break-spaces;\n"], ["\n  white-space: break-spaces;\n"])));
var INPUT_PROPS = {
    placeholder: 'Search'
};
function SearchPanel(props) {
    var model = props.model, setSearchWord = props.setSearchWord, controller = props.controller;
    var onClose = function () {
        controller.run('operation', __assign(__assign({}, props), { opType: core.OpType.SET_FOCUS_MODE, focusMode: core.FocusMode.NORMAL }));
    };
    var getAllSections = function () {
        var res = [];
        model.topics.forEach(function (topic, topicKey) {
            res.push({
                key: topicKey,
                title: controller.run('getTopicTitle', __assign(__assign({}, props), { topicKey: topicKey }))
            });
        });
        return res;
    };
    var navigateToTopic = function (topicKey) { return function (e) {
        controller.run('focusTopicAndMoveToCenter', __assign(__assign({}, props), { topicKey: topicKey }));
    }; };
    var renderItem = function (section, props) {
        // const pathElements = section.path.reduce<React.ReactChild[]>(
        //   (elems, el) => {
        //     elems.push(el, <Icon key={el} icon="caret-right" />);
        //     return elems;
        //   },
        //   []
        // );
        var key = section.key, sectionTitle = section.title;
        var maxLength = 100;
        var needTip = sectionTitle.length > maxLength;
        var title = needTip
            ? sectionTitle.substr(0, maxLength) + '...'
            : sectionTitle;
        var titleProps = {
            key: key,
            onClick: navigateToTopic(key)
        };
        var titleEl = React.createElement(TopicTitle, __assign({}, titleProps), title);
        var tip = (React.createElement(Tip, null,
            React.createElement(TipContent, null, sectionTitle)));
        var popoverProps = {
            key: key,
            target: titleEl,
            content: tip,
            fill: true,
            interactionKind: core$1.PopoverInteractionKind.HOVER_TARGET_ONLY,
            hoverOpenDelay: 1000
        };
        return needTip ? React.createElement(StyledPopover, __assign({}, popoverProps)) : titleEl;
    };
    var filterMatches = function (query, items) {
        return items.filter(function (item) {
            return item.title.toLowerCase().includes(query.toLowerCase());
        });
    };
    var sections = getAllSections();
    return (React.createElement(StyledNavOmniBar, { inputProps: INPUT_PROPS, itemListPredicate: filterMatches, isOpen: true, items: sections, itemRenderer: renderItem, 
        // onItemSelect={handleItemSelect}
        onClose: onClose, resetOnSelect: true }));
}
var templateObject_1$3, templateObject_2$3, templateObject_3$2, templateObject_4$1, templateObject_5$1;

var HOT_KEY_NAME_SEARCH = 'DEFAULT_SEARCH';
var FOCUS_MODE_SEARCH = 'FOCUS_MODE_SEARCH';

function SearchPlugin() {
    var setSearchWorld = function (s) {
    };
    return {
        customizeHotKeys: function (props, next) {
            var controller = props.controller, model = props.model;
            var hotKeys = next();
            hotKeys.globalHotKeys.set(HOT_KEY_NAME_SEARCH, {
                label: 'search',
                combo: 'ctrl + f',
                onKeyDown: function () {
                    controller.run('operation', __assign(__assign({}, props), { opType: core.OpType.FOCUS_TOPIC, topicKey: model.focusKey, focusMode: FOCUS_MODE_SEARCH }));
                }
            });
            return hotKeys;
        },
        renderDiagramCustomize: function (props, next) {
            var res = next();
            var model = props.model;
            if (model.focusMode === FOCUS_MODE_SEARCH) {
                var searchPanelProps = __assign(__assign({ key: 'search-panel' }, props), { setSearchWorld: setSearchWorld });
                res.push(React.createElement(SearchPanel, __assign({}, searchPanelProps)));
            }
            return res;
        }
    };
}

exports.FOCUS_MODE_SEARCH = FOCUS_MODE_SEARCH;
exports.HOT_KEY_NAME_SEARCH = HOT_KEY_NAME_SEARCH;
exports.SearchPlugin = SearchPlugin;
exports.TopicReferencePlugin = TopicReferencePlugin;
//# sourceMappingURL=main.js.map
