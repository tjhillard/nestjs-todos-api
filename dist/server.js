/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5049b1ee6f90774e8af3";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/swagger.config.ts":
/*!**********************************!*\
  !*** ./config/swagger.config.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nexports.swaggerOptions = new swagger_1.DocumentBuilder()\n    .setTitle('Nestjs Todos')\n    .setDescription('Documentation for the Nestjs Todos Example API')\n    .setVersion('0.0.1')\n    .setBasePath('api/v1')\n    .addBearerAuth()\n    .addTag('todos')\n    .addTag('auth')\n    .addTag('users')\n    .build();\n\n\n//# sourceURL=webpack:///./config/swagger.config.ts?");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function(moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function(moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function(moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function(moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t\"[HMR] Consider using the NamedModulesPlugin for module names.\"\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function(level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function(level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function(level) {\n\tlogLevel = level;\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/*globals __resourceQuery */\nif (true) {\n\tvar hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tvar checkForUpdate = function checkForUpdate(fromUpdate) {\n\t\tif (module.hot.status() === \"idle\") {\n\t\t\tmodule.hot\n\t\t\t\t.check(true)\n\t\t\t\t.then(function(updatedModules) {\n\t\t\t\t\tif (!updatedModules) {\n\t\t\t\t\t\tif (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\t\t\t\t\tcheckForUpdate(true);\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tvar status = module.hot.status();\n\t\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot apply update.\");\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] \" + (err.stack || err.message));\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] You need to restart the application!\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlog(\n\t\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\t\"[HMR] Update failed: \" + (err.stack || err.message)\n\t\t\t\t\t\t);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t}\n\t};\n\tsetInterval(checkForUpdate, hotPollInterval);\n} else {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?100\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst todos_module_1 = __webpack_require__(/*! ./modules/todos/todos.module */ \"./src/modules/todos/todos.module.ts\");\nconst users_module_1 = __webpack_require__(/*! ./modules/users/users.module */ \"./src/modules/users/users.module.ts\");\nconst auth_module_1 = __webpack_require__(/*! ./modules/auth/auth.module */ \"./src/modules/auth/auth.module.ts\");\nconst user_entity_1 = __webpack_require__(/*! src/modules/users/user.entity */ \"./src/modules/users/user.entity.ts\");\nconst todo_entity_1 = __webpack_require__(/*! ./modules/todos/todo.entity */ \"./src/modules/todos/todo.entity.ts\");\nlet AppModule = class AppModule {\n};\nAppModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forRoot({\n                keepConnectionAlive: true,\n                type: 'postgres',\n                url: process.env.DATABASE_URL,\n                logging: true,\n                synchronize: true,\n                entities: [\n                    user_entity_1.UserEntity,\n                    todo_entity_1.TodoEntity,\n                ],\n            }),\n            todos_module_1.TodosModule,\n            users_module_1.UsersModule,\n            auth_module_1.AuthModule,\n        ],\n    })\n], AppModule);\nexports.AppModule = AppModule;\n\n\n//# sourceURL=webpack:///./src/app.module.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\nconst core_1 = __webpack_require__(/*! @nestjs/core */ \"@nestjs/core\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst swagger_config_1 = __webpack_require__(/*! ../config/swagger.config */ \"./config/swagger.config.ts\");\nconst entity_not_found_filter_1 = __webpack_require__(/*! ./shared/filters/exceptions/entity-not-found.filter */ \"./src/shared/filters/exceptions/entity-not-found.filter.ts\");\nconst app_module_1 = __webpack_require__(/*! ./app.module */ \"./src/app.module.ts\");\nconst port = process.env.PORT || 3000;\nfunction bootstrap() {\n    return __awaiter(this, void 0, void 0, function* () {\n        const app = yield core_1.NestFactory.create(app_module_1.AppModule);\n        app.setGlobalPrefix('/api/v1');\n        app.useGlobalFilters(new entity_not_found_filter_1.EntityNotFoundErrorFilter());\n        const document = swagger_1.SwaggerModule.createDocument(app, swagger_config_1.swaggerOptions);\n        swagger_1.SwaggerModule.setup('/api/v1/docs', app, document);\n        yield app.listen(port);\n        common_1.Logger.log(`Server running on http://localhost:${port}  🚀 👌`, 'bootstrap()');\n        if (true) {\n            module.hot.accept();\n            module.hot.dispose(() => app.close());\n        }\n    });\n}\nbootstrap();\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/modules/auth/auth.controller.ts":
/*!*********************************************!*\
  !*** ./src/modules/auth/auth.controller.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst base_validation_pipe_1 = __webpack_require__(/*! src/shared/pipes/base-validation.pipe */ \"./src/shared/pipes/base-validation.pipe.ts\");\nconst auth_service_1 = __webpack_require__(/*! ./auth.service */ \"./src/modules/auth/auth.service.ts\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst auth_dto_1 = __webpack_require__(/*! ./auth.dto */ \"./src/modules/auth/auth.dto.ts\");\nlet AuthController = class AuthController {\n    constructor(authService) {\n        this.authService = authService;\n    }\n    register(data) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.authService.register(data);\n        });\n    }\n    login(data) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.authService.login(data);\n        });\n    }\n};\n__decorate([\n    common_1.Post('register'),\n    __param(0, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [auth_dto_1.AuthDto]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"register\", null);\n__decorate([\n    common_1.Post('login'),\n    __param(0, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [auth_dto_1.AuthDto]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"login\", null);\nAuthController = __decorate([\n    common_1.Controller('auth'),\n    swagger_1.ApiUseTags('auth'), swagger_1.ApiBearerAuth(),\n    common_1.UsePipes(new base_validation_pipe_1.BaseValidationPipe()),\n    __metadata(\"design:paramtypes\", [auth_service_1.AuthService])\n], AuthController);\nexports.AuthController = AuthController;\n\n\n//# sourceURL=webpack:///./src/modules/auth/auth.controller.ts?");

/***/ }),

/***/ "./src/modules/auth/auth.dto.ts":
/*!**************************************!*\
  !*** ./src/modules/auth/auth.dto.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass AuthDto {\n}\n__decorate([\n    class_validator_1.IsEmail(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], AuthDto.prototype, \"email\", void 0);\n__decorate([\n    class_validator_1.Length(6),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], AuthDto.prototype, \"password\", void 0);\nexports.AuthDto = AuthDto;\n\n\n//# sourceURL=webpack:///./src/modules/auth/auth.dto.ts?");

/***/ }),

/***/ "./src/modules/auth/auth.module.ts":
/*!*****************************************!*\
  !*** ./src/modules/auth/auth.module.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst auth_controller_1 = __webpack_require__(/*! ./auth.controller */ \"./src/modules/auth/auth.controller.ts\");\nconst auth_service_1 = __webpack_require__(/*! ./auth.service */ \"./src/modules/auth/auth.service.ts\");\nconst user_entity_1 = __webpack_require__(/*! src/modules/users/user.entity */ \"./src/modules/users/user.entity.ts\");\nlet AuthModule = class AuthModule {\n};\nAuthModule = __decorate([\n    common_1.Module({\n        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity])],\n        controllers: [auth_controller_1.AuthController],\n        providers: [auth_service_1.AuthService],\n    })\n], AuthModule);\nexports.AuthModule = AuthModule;\n\n\n//# sourceURL=webpack:///./src/modules/auth/auth.module.ts?");

/***/ }),

/***/ "./src/modules/auth/auth.service.ts":
/*!******************************************!*\
  !*** ./src/modules/auth/auth.service.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst user_entity_1 = __webpack_require__(/*! src/modules/users/user.entity */ \"./src/modules/users/user.entity.ts\");\nconst crud_service_1 = __webpack_require__(/*! src/shared/services/crud.service */ \"./src/shared/services/crud.service.ts\");\nlet AuthService = class AuthService extends crud_service_1.CrudService {\n    constructor(userRepository) {\n        super(userRepository);\n        this.userRepository = userRepository;\n    }\n    register(data) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { email } = data;\n            let user = yield this.userRepository.findOne({ where: { email } });\n            if (user) {\n                throw new common_1.HttpException('User with provided email already exists', common_1.HttpStatus.BAD_REQUEST);\n            }\n            user = yield this.create(data);\n            return user.serialize({ includeToken: true });\n        });\n    }\n    login(data) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { email, password } = data;\n            const user = yield this.userRepository.findOne({ where: { email } });\n            if (!user || !(yield user.comparePassword(password))) {\n                throw new common_1.HttpException('Invalid email/password combination', common_1.HttpStatus.BAD_REQUEST);\n            }\n            return user.serialize({ includeToken: true });\n        });\n    }\n};\nAuthService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository])\n], AuthService);\nexports.AuthService = AuthService;\n\n\n//# sourceURL=webpack:///./src/modules/auth/auth.service.ts?");

/***/ }),

/***/ "./src/modules/todos/todo.dto.ts":
/*!***************************************!*\
  !*** ./src/modules/todos/todo.dto.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nclass TodoCreateDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.IsNotEmpty(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], TodoCreateDto.prototype, \"description\", void 0);\nexports.TodoCreateDto = TodoCreateDto;\nclass TodoUpdateDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.IsNotEmpty(),\n    class_validator_1.IsOptional(),\n    swagger_1.ApiModelProperty({ required: false }),\n    __metadata(\"design:type\", String)\n], TodoUpdateDto.prototype, \"description\", void 0);\n__decorate([\n    class_validator_1.IsBoolean(),\n    class_validator_1.IsOptional(),\n    swagger_1.ApiModelProperty({ required: false }),\n    __metadata(\"design:type\", Boolean)\n], TodoUpdateDto.prototype, \"completed\", void 0);\nexports.TodoUpdateDto = TodoUpdateDto;\nclass TodoResponseObject {\n}\nexports.TodoResponseObject = TodoResponseObject;\n\n\n//# sourceURL=webpack:///./src/modules/todos/todo.dto.ts?");

/***/ }),

/***/ "./src/modules/todos/todo.entity.ts":
/*!******************************************!*\
  !*** ./src/modules/todos/todo.entity.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/modules/users/user.entity.ts\");\nlet TodoEntity = class TodoEntity {\n    serialize() {\n        const { id, description, completed, created_at, updated_at } = this;\n        const serializedTodo = { id, description, completed, created_at, updated_at };\n        return serializedTodo;\n    }\n};\n__decorate([\n    typeorm_1.PrimaryGeneratedColumn(),\n    __metadata(\"design:type\", Number)\n], TodoEntity.prototype, \"id\", void 0);\n__decorate([\n    typeorm_1.Column('text'),\n    __metadata(\"design:type\", String)\n], TodoEntity.prototype, \"description\", void 0);\n__decorate([\n    typeorm_1.Column({ default: false }),\n    __metadata(\"design:type\", Boolean)\n], TodoEntity.prototype, \"completed\", void 0);\n__decorate([\n    typeorm_1.CreateDateColumn(),\n    __metadata(\"design:type\", Date)\n], TodoEntity.prototype, \"created_at\", void 0);\n__decorate([\n    typeorm_1.UpdateDateColumn(),\n    __metadata(\"design:type\", Date)\n], TodoEntity.prototype, \"updated_at\", void 0);\n__decorate([\n    typeorm_1.Column({ default: false }),\n    __metadata(\"design:type\", Boolean)\n], TodoEntity.prototype, \"deleted\", void 0);\n__decorate([\n    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, user => user.todos),\n    typeorm_1.JoinColumn({ name: 'user_id' }),\n    __metadata(\"design:type\", user_entity_1.UserEntity)\n], TodoEntity.prototype, \"user\", void 0);\nTodoEntity = __decorate([\n    typeorm_1.Entity('todos')\n], TodoEntity);\nexports.TodoEntity = TodoEntity;\n\n\n//# sourceURL=webpack:///./src/modules/todos/todo.entity.ts?");

/***/ }),

/***/ "./src/modules/todos/todos.controller.ts":
/*!***********************************************!*\
  !*** ./src/modules/todos/todos.controller.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst base_validation_pipe_1 = __webpack_require__(/*! src/shared/pipes/base-validation.pipe */ \"./src/shared/pipes/base-validation.pipe.ts\");\nconst auth_guard_1 = __webpack_require__(/*! src/shared/guards/auth.guard */ \"./src/shared/guards/auth.guard.ts\");\nconst todos_service_1 = __webpack_require__(/*! ./todos.service */ \"./src/modules/todos/todos.service.ts\");\nconst todo_dto_1 = __webpack_require__(/*! ./todo.dto */ \"./src/modules/todos/todo.dto.ts\");\nconst roles_guard_1 = __webpack_require__(/*! src/shared/guards/roles.guard */ \"./src/shared/guards/roles.guard.ts\");\nconst todos_policy_1 = __webpack_require__(/*! ./todos.policy */ \"./src/modules/todos/todos.policy.ts\");\nconst user_decorator_1 = __webpack_require__(/*! src/shared/decorators/user.decorator */ \"./src/shared/decorators/user.decorator.ts\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/modules/users/user.entity.ts\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nlet TodosController = class TodosController {\n    constructor(todosService) {\n        this.todosService = todosService;\n    }\n    index(user) {\n        return this.todosService.getAll(user);\n    }\n    show(id, user) {\n        return this.todosService.getOne(id, user);\n    }\n    create(userId, data) {\n        return this.todosService.create(data, userId);\n    }\n    update(id, data, user) {\n        return this.todosService.update(id, data, user);\n    }\n    destroy(id, user) {\n        return this.todosService.softDelete(id, user);\n    }\n};\n__decorate([\n    common_1.Get(),\n    __param(0, user_decorator_1.User()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [user_entity_1.UserEntity]),\n    __metadata(\"design:returntype\", Promise)\n], TodosController.prototype, \"index\", null);\n__decorate([\n    common_1.Get(':id'),\n    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, user_entity_1.UserEntity]),\n    __metadata(\"design:returntype\", Promise)\n], TodosController.prototype, \"show\", null);\n__decorate([\n    common_1.Post(),\n    common_1.UsePipes(new base_validation_pipe_1.BaseValidationPipe()),\n    __param(0, user_decorator_1.User('id')), __param(1, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, todo_dto_1.TodoCreateDto]),\n    __metadata(\"design:returntype\", Promise)\n], TodosController.prototype, \"create\", null);\n__decorate([\n    common_1.Put(':id'),\n    common_1.UsePipes(new base_validation_pipe_1.BaseValidationPipe()),\n    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, user_decorator_1.User()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, todo_dto_1.TodoUpdateDto, user_entity_1.UserEntity]),\n    __metadata(\"design:returntype\", Promise)\n], TodosController.prototype, \"update\", null);\n__decorate([\n    common_1.Delete(':id'),\n    common_1.HttpCode(204),\n    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, user_entity_1.UserEntity]),\n    __metadata(\"design:returntype\", Promise)\n], TodosController.prototype, \"destroy\", null);\nTodosController = __decorate([\n    common_1.Controller('todos'),\n    swagger_1.ApiUseTags('todos'), swagger_1.ApiBearerAuth(),\n    common_1.UseGuards(new auth_guard_1.AuthGuard(), new roles_guard_1.RolesGuard(new todos_policy_1.TodosPolicy())),\n    __metadata(\"design:paramtypes\", [todos_service_1.TodosService])\n], TodosController);\nexports.TodosController = TodosController;\n\n\n//# sourceURL=webpack:///./src/modules/todos/todos.controller.ts?");

/***/ }),

/***/ "./src/modules/todos/todos.module.ts":
/*!*******************************************!*\
  !*** ./src/modules/todos/todos.module.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst todo_entity_1 = __webpack_require__(/*! ./todo.entity */ \"./src/modules/todos/todo.entity.ts\");\nconst todos_controller_1 = __webpack_require__(/*! ./todos.controller */ \"./src/modules/todos/todos.controller.ts\");\nconst todos_service_1 = __webpack_require__(/*! ./todos.service */ \"./src/modules/todos/todos.service.ts\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/modules/users/user.entity.ts\");\nlet TodosModule = class TodosModule {\n};\nTodosModule = __decorate([\n    common_1.Module({\n        imports: [typeorm_1.TypeOrmModule.forFeature([todo_entity_1.TodoEntity, user_entity_1.UserEntity])],\n        controllers: [todos_controller_1.TodosController],\n        providers: [todos_service_1.TodosService],\n    })\n], TodosModule);\nexports.TodosModule = TodosModule;\n\n\n//# sourceURL=webpack:///./src/modules/todos/todos.module.ts?");

/***/ }),

/***/ "./src/modules/todos/todos.policy.ts":
/*!*******************************************!*\
  !*** ./src/modules/todos/todos.policy.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst base_policy_1 = __webpack_require__(/*! src/shared/classes/base.policy */ \"./src/shared/classes/base.policy.ts\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nclass TodosPolicy extends base_policy_1.BasePolicy {\n    authorizeOwnership(user, resource) {\n        if (user.id === resource.uesr_id) {\n            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);\n        }\n    }\n    all(user, response) {\n        return true;\n    }\n}\nexports.TodosPolicy = TodosPolicy;\n\n\n//# sourceURL=webpack:///./src/modules/todos/todos.policy.ts?");

/***/ }),

/***/ "./src/modules/todos/todos.service.ts":
/*!********************************************!*\
  !*** ./src/modules/todos/todos.service.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst todo_entity_1 = __webpack_require__(/*! ./todo.entity */ \"./src/modules/todos/todo.entity.ts\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/modules/users/user.entity.ts\");\nconst todos_policy_1 = __webpack_require__(/*! ./todos.policy */ \"./src/modules/todos/todos.policy.ts\");\nlet TodosService = class TodosService {\n    constructor(todoRepository, userRepository) {\n        this.todoRepository = todoRepository;\n        this.userRepository = userRepository;\n        this.policy = new todos_policy_1.TodosPolicy();\n    }\n    getAll(user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const collection = yield this.todoRepository.find({ where: { deleted: false, user } });\n            return collection.map(entity => this.getSerializedEntity(entity));\n        });\n    }\n    create(data, userId) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const user = yield this.userRepository.findOne({ where: { id: userId } });\n            const item = yield this.todoRepository.create(Object.assign({}, data, { user }));\n            yield this.todoRepository.save(item);\n            return this.getSerializedEntity(item);\n        });\n    }\n    getOne(id, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.todoRepository.findOneOrFail({ where: { id, deleted: false, user } });\n        });\n    }\n    update(id, data, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.todoRepository.findOneOrFail({ where: { id, deleted: false, user } });\n            yield this.todoRepository.update(id, data);\n            return yield this.todoRepository.findOne(id);\n        });\n    }\n    softDelete(id, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.todoRepository.findOneOrFail({ where: { id, deleted: false, user } });\n            yield this.todoRepository.update(id, { deleted: true });\n            return;\n        });\n    }\n    getSerializedEntity(entity) {\n        return entity.serialize ? entity.serialize() : entity;\n    }\n};\nTodosService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_2.InjectRepository(todo_entity_1.TodoEntity)),\n    __param(1, typeorm_2.InjectRepository(user_entity_1.UserEntity)),\n    __metadata(\"design:paramtypes\", [typeorm_1.Repository,\n        typeorm_1.Repository])\n], TodosService);\nexports.TodosService = TodosService;\n\n\n//# sourceURL=webpack:///./src/modules/todos/todos.service.ts?");

/***/ }),

/***/ "./src/modules/users/user.entity.ts":
/*!******************************************!*\
  !*** ./src/modules/users/user.entity.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst todo_entity_1 = __webpack_require__(/*! ../todos/todo.entity */ \"./src/modules/todos/todo.entity.ts\");\nlet UserEntity = class UserEntity {\n    hashPassword() {\n        return __awaiter(this, void 0, void 0, function* () {\n            this.password = yield bcrypt.hash(this.password, 10);\n        });\n    }\n    serialize(options = { includeToken: false }) {\n        const { id, email, role, token, created_at, updated_at } = this;\n        const serializedUser = { id, email, role, created_at, updated_at };\n        if (options.includeToken) {\n            serializedUser.token = token;\n        }\n        return serializedUser;\n    }\n    comparePassword(given) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield bcrypt.compare(given, this.password);\n        });\n    }\n    get token() {\n        const { id, email, role } = this;\n        return jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: '7d' });\n    }\n};\n__decorate([\n    typeorm_1.PrimaryGeneratedColumn(),\n    __metadata(\"design:type\", Number)\n], UserEntity.prototype, \"id\", void 0);\n__decorate([\n    typeorm_1.Column({\n        type: 'text',\n        unique: true,\n    }),\n    __metadata(\"design:type\", String)\n], UserEntity.prototype, \"email\", void 0);\n__decorate([\n    typeorm_1.Column('text'),\n    __metadata(\"design:type\", String)\n], UserEntity.prototype, \"password\", void 0);\n__decorate([\n    typeorm_1.Column({ default: 0 }),\n    __metadata(\"design:type\", Number)\n], UserEntity.prototype, \"role\", void 0);\n__decorate([\n    typeorm_1.CreateDateColumn(),\n    __metadata(\"design:type\", Date)\n], UserEntity.prototype, \"created_at\", void 0);\n__decorate([\n    typeorm_1.UpdateDateColumn(),\n    __metadata(\"design:type\", Date)\n], UserEntity.prototype, \"updated_at\", void 0);\n__decorate([\n    typeorm_1.Column({ default: false }),\n    __metadata(\"design:type\", Boolean)\n], UserEntity.prototype, \"deleted\", void 0);\n__decorate([\n    typeorm_1.Column({ default: false }),\n    __metadata(\"design:type\", Boolean)\n], UserEntity.prototype, \"banned\", void 0);\n__decorate([\n    typeorm_1.OneToMany(type => todo_entity_1.TodoEntity, todo => todo.user),\n    __metadata(\"design:type\", Array)\n], UserEntity.prototype, \"todos\", void 0);\n__decorate([\n    typeorm_1.BeforeInsert(),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", Promise)\n], UserEntity.prototype, \"hashPassword\", null);\nUserEntity = __decorate([\n    typeorm_1.Entity('users')\n], UserEntity);\nexports.UserEntity = UserEntity;\n\n\n//# sourceURL=webpack:///./src/modules/users/user.entity.ts?");

/***/ }),

/***/ "./src/modules/users/users.controller.ts":
/*!***********************************************!*\
  !*** ./src/modules/users/users.controller.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst auth_guard_1 = __webpack_require__(/*! src/shared/guards/auth.guard */ \"./src/shared/guards/auth.guard.ts\");\nconst roles_guard_1 = __webpack_require__(/*! src/shared/guards/roles.guard */ \"./src/shared/guards/roles.guard.ts\");\nconst users_service_1 = __webpack_require__(/*! ./users.service */ \"./src/modules/users/users.service.ts\");\nconst users_policy_1 = __webpack_require__(/*! ./users.policy */ \"./src/modules/users/users.policy.ts\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nlet UsersController = class UsersController {\n    constructor(usersService) {\n        this.usersService = usersService;\n    }\n    getAllUsers() {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.usersService.getAll();\n        });\n    }\n};\n__decorate([\n    common_1.Get(),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", Promise)\n], UsersController.prototype, \"getAllUsers\", null);\nUsersController = __decorate([\n    common_1.Controller('users'),\n    swagger_1.ApiUseTags('users'), swagger_1.ApiBearerAuth(),\n    common_1.UseGuards(new auth_guard_1.AuthGuard(), new roles_guard_1.RolesGuard(new users_policy_1.UsersPolicy())),\n    __metadata(\"design:paramtypes\", [users_service_1.UsersService])\n], UsersController);\nexports.UsersController = UsersController;\n\n\n//# sourceURL=webpack:///./src/modules/users/users.controller.ts?");

/***/ }),

/***/ "./src/modules/users/users.module.ts":
/*!*******************************************!*\
  !*** ./src/modules/users/users.module.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst users_controller_1 = __webpack_require__(/*! ./users.controller */ \"./src/modules/users/users.controller.ts\");\nconst users_service_1 = __webpack_require__(/*! ./users.service */ \"./src/modules/users/users.service.ts\");\nconst user_entity_1 = __webpack_require__(/*! ./user.entity */ \"./src/modules/users/user.entity.ts\");\nlet UsersModule = class UsersModule {\n};\nUsersModule = __decorate([\n    common_1.Module({\n        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity])],\n        controllers: [users_controller_1.UsersController],\n        providers: [users_service_1.UsersService],\n    })\n], UsersModule);\nexports.UsersModule = UsersModule;\n\n\n//# sourceURL=webpack:///./src/modules/users/users.module.ts?");

/***/ }),

/***/ "./src/modules/users/users.policy.ts":
/*!*******************************************!*\
  !*** ./src/modules/users/users.policy.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst base_policy_1 = __webpack_require__(/*! src/shared/classes/base.policy */ \"./src/shared/classes/base.policy.ts\");\nclass UsersPolicy extends base_policy_1.BasePolicy {\n    all(user) {\n        return this.isAdmin(user) || this.isSuperAdmin(user);\n    }\n}\nexports.UsersPolicy = UsersPolicy;\n\n\n//# sourceURL=webpack:///./src/modules/users/users.policy.ts?");

/***/ }),

/***/ "./src/modules/users/users.service.ts":
/*!********************************************!*\
  !*** ./src/modules/users/users.service.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst crud_service_1 = __webpack_require__(/*! src/shared/services/crud.service */ \"./src/shared/services/crud.service.ts\");\nconst user_entity_1 = __webpack_require__(/*! ./user.entity */ \"./src/modules/users/user.entity.ts\");\nlet UsersService = class UsersService extends crud_service_1.CrudService {\n    constructor(userRepository) {\n        super(userRepository);\n        this.userRepository = userRepository;\n    }\n};\nUsersService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository])\n], UsersService);\nexports.UsersService = UsersService;\n\n\n//# sourceURL=webpack:///./src/modules/users/users.service.ts?");

/***/ }),

/***/ "./src/shared/classes/base.policy.ts":
/*!*******************************************!*\
  !*** ./src/shared/classes/base.policy.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst roles_service_1 = __webpack_require__(/*! ../services/roles.service */ \"./src/shared/services/roles.service.ts\");\nclass BasePolicy {\n    isSuperAdmin(user) {\n        return roles_service_1.RolesService.parse(user.role) === 'superadmin';\n    }\n    isAdmin(user) {\n        return roles_service_1.RolesService.parse(user.role) === 'admin';\n    }\n    isInternal(user) {\n        return roles_service_1.RolesService.parse(user.role) === 'internal';\n    }\n}\nexports.BasePolicy = BasePolicy;\n\n\n//# sourceURL=webpack:///./src/shared/classes/base.policy.ts?");

/***/ }),

/***/ "./src/shared/decorators/user.decorator.ts":
/*!*************************************************!*\
  !*** ./src/shared/decorators/user.decorator.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nexports.User = common_1.createParamDecorator((data, req) => {\n    return data ? req.user[data] : req.user;\n});\n\n\n//# sourceURL=webpack:///./src/shared/decorators/user.decorator.ts?");

/***/ }),

/***/ "./src/shared/filters/exceptions/entity-not-found.filter.ts":
/*!******************************************************************!*\
  !*** ./src/shared/filters/exceptions/entity-not-found.filter.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst EntityNotFoundError_1 = __webpack_require__(/*! typeorm/error/EntityNotFoundError */ \"typeorm/error/EntityNotFoundError\");\nconst errors_service_1 = __webpack_require__(/*! src/shared/services/errors.service */ \"./src/shared/services/errors.service.ts\");\nlet EntityNotFoundErrorFilter = class EntityNotFoundErrorFilter {\n    catch(exception, host) {\n        const ctx = host.switchToHttp();\n        const request = ctx.getRequest();\n        const response = ctx.getResponse();\n        return response\n            .status(common_1.HttpStatus.NOT_FOUND)\n            .json(errors_service_1.ErrorsService.notFound(request));\n    }\n};\nEntityNotFoundErrorFilter = __decorate([\n    common_1.Catch(EntityNotFoundError_1.EntityNotFoundError)\n], EntityNotFoundErrorFilter);\nexports.EntityNotFoundErrorFilter = EntityNotFoundErrorFilter;\n\n\n//# sourceURL=webpack:///./src/shared/filters/exceptions/entity-not-found.filter.ts?");

/***/ }),

/***/ "./src/shared/guards/auth.guard.ts":
/*!*****************************************!*\
  !*** ./src/shared/guards/auth.guard.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst jsonwebtoken_1 = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nlet AuthGuard = class AuthGuard {\n    canActivate(context) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const request = context.switchToHttp().getRequest();\n            if (!request.headers.authorization) {\n                this.throwUnauthorized();\n            }\n            request.user = yield this.validateToken(request.headers.authorization);\n            if (request.user.deleted) {\n                return false;\n            }\n            if (request.user.banned) {\n                return false;\n            }\n            return true;\n        });\n    }\n    validateToken(authHeaderValue) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (authHeaderValue.split(' ')[0] !== 'Bearer') {\n                return this.throwUnauthorized();\n            }\n            const token = authHeaderValue.split(' ')[1];\n            try {\n                return yield jsonwebtoken_1.verify(token, process.env.JWT_SECRET);\n            }\n            catch (err) {\n                const message = `JWT error: ${err.message || err.name}`;\n                this.throwUnauthorized(message);\n            }\n            return true;\n        });\n    }\n    throwUnauthorized(message) {\n        throw new common_1.HttpException(message || 'Unauthenticated', common_1.HttpStatus.UNAUTHORIZED);\n    }\n};\nAuthGuard = __decorate([\n    common_1.Injectable()\n], AuthGuard);\nexports.AuthGuard = AuthGuard;\n\n\n//# sourceURL=webpack:///./src/shared/guards/auth.guard.ts?");

/***/ }),

/***/ "./src/shared/guards/roles.guard.ts":
/*!******************************************!*\
  !*** ./src/shared/guards/roles.guard.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nlet RolesGuard = class RolesGuard {\n    constructor(policy) {\n        this.policy = policy;\n    }\n    canActivate(context) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const ctx = context.switchToHttp();\n            const request = ctx.getRequest();\n            if (this.policy[context.getHandler().name]) {\n                return this.policy[context.getHandler().name](request.user);\n            }\n            if (this.policy.all) {\n                return this.policy.all(request.user);\n            }\n            return false;\n        });\n    }\n};\nRolesGuard = __decorate([\n    common_1.Injectable(),\n    __metadata(\"design:paramtypes\", [Object])\n], RolesGuard);\nexports.RolesGuard = RolesGuard;\n\n\n//# sourceURL=webpack:///./src/shared/guards/roles.guard.ts?");

/***/ }),

/***/ "./src/shared/pipes/base-validation.pipe.ts":
/*!**************************************************!*\
  !*** ./src/shared/pipes/base-validation.pipe.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst class_transformer_1 = __webpack_require__(/*! class-transformer */ \"class-transformer\");\nlet BaseValidationPipe = class BaseValidationPipe {\n    transform(value, metadata) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { metatype } = metadata;\n            if (!metatype || !this.toValidate(metatype)) {\n                return value;\n            }\n            const object = class_transformer_1.plainToClass(metatype, value);\n            const errors = yield class_validator_1.validate(object);\n            if (errors.length > 0) {\n                throw new common_1.HttpException({\n                    message: 'Validation failed',\n                    details: `${this.formatErrors(errors)}.`,\n                }, common_1.HttpStatus.BAD_REQUEST);\n            }\n            return value;\n        });\n    }\n    toValidate(metatype) {\n        const types = [String, Boolean, Number, Array, Object];\n        return !types.find((type) => metatype === type);\n    }\n    formatErrors(errors) {\n        return errors.map(err => {\n            for (const property in err.constraints) {\n                return err.constraints[property];\n            }\n        }).join(', ');\n    }\n};\nBaseValidationPipe = __decorate([\n    common_1.Injectable()\n], BaseValidationPipe);\nexports.BaseValidationPipe = BaseValidationPipe;\n\n\n//# sourceURL=webpack:///./src/shared/pipes/base-validation.pipe.ts?");

/***/ }),

/***/ "./src/shared/services/crud.service.ts":
/*!*********************************************!*\
  !*** ./src/shared/services/crud.service.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass CrudService {\n    constructor(repository) {\n        this.repository = repository;\n    }\n    getAll(whereConditions = {}) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const where = Object.assign({ deleted: false }, whereConditions);\n            const collection = yield this.repository.find({ where });\n            return collection.map(entity => this.getSerializedEntity(entity));\n        });\n    }\n    create(data) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const item = yield this.repository.create(Object.assign({}, data));\n            yield this.repository.save(item);\n            return item;\n        });\n    }\n    getOne(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.repository.findOneOrFail({ where: { id, deleted: false } });\n        });\n    }\n    update(id, data) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.repository.findOneOrFail({ where: { id, deleted: false } });\n            yield this.repository.update(id, data);\n            return yield this.repository.findOne(id);\n        });\n    }\n    softDelete(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.repository.findOneOrFail({ where: { id } });\n            yield this.update(id, { deleted: true });\n            return;\n        });\n    }\n    destroy(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.repository.findOneOrFail({ where: { id } });\n            yield this.repository.delete(id);\n            return;\n        });\n    }\n    getSerializedEntity(entity) {\n        return entity.serialize ? entity.serialize() : entity;\n    }\n}\nexports.CrudService = CrudService;\n\n\n//# sourceURL=webpack:///./src/shared/services/crud.service.ts?");

/***/ }),

/***/ "./src/shared/services/errors.service.ts":
/*!***********************************************!*\
  !*** ./src/shared/services/errors.service.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nclass ErrorsService {\n    static notFound(request) {\n        return {\n            statusCode: common_1.HttpStatus.NOT_FOUND,\n            message: 'Not found',\n            path: request.path,\n            method: request.method,\n        };\n    }\n}\nexports.ErrorsService = ErrorsService;\n\n\n//# sourceURL=webpack:///./src/shared/services/errors.service.ts?");

/***/ }),

/***/ "./src/shared/services/roles.service.ts":
/*!**********************************************!*\
  !*** ./src/shared/services/roles.service.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass RolesService {\n    static parse(role) {\n        if (role === 0) {\n            return 'user';\n        }\n        if (role === 1) {\n            return 'superadmin';\n        }\n        if (role === 2) {\n            return 'admin';\n        }\n        if (role === 4) {\n            return 'internal';\n        }\n    }\n}\nexports.RolesService = RolesService;\n\n\n//# sourceURL=webpack:///./src/shared/services/roles.service.ts?");

/***/ }),

/***/ 0:
/*!************************************************!*\
  !*** multi webpack/hot/poll?100 ./src/main.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"./node_modules/webpack/hot/poll.js?100\");\nmodule.exports = __webpack_require__(/*! ./src/main.ts */\"./src/main.ts\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/common\");\n\n//# sourceURL=webpack:///external_%22@nestjs/common%22?");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/core\");\n\n//# sourceURL=webpack:///external_%22@nestjs/core%22?");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/swagger\");\n\n//# sourceURL=webpack:///external_%22@nestjs/swagger%22?");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/typeorm\");\n\n//# sourceURL=webpack:///external_%22@nestjs/typeorm%22?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"class-transformer\");\n\n//# sourceURL=webpack:///external_%22class-transformer%22?");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"class-validator\");\n\n//# sourceURL=webpack:///external_%22class-validator%22?");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv/config\");\n\n//# sourceURL=webpack:///external_%22dotenv/config%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"typeorm\");\n\n//# sourceURL=webpack:///external_%22typeorm%22?");

/***/ }),

/***/ "typeorm/error/EntityNotFoundError":
/*!****************************************************!*\
  !*** external "typeorm/error/EntityNotFoundError" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"typeorm/error/EntityNotFoundError\");\n\n//# sourceURL=webpack:///external_%22typeorm/error/EntityNotFoundError%22?");

/***/ })

/******/ });