var elm_list = document.getElementById("list"),
	elm_multipleLayout = document.getElementsByClassName("j-multipleLayout")[0],
	elm_singleLayout = document.getElementsByClassName("j-singleLayout")[0],
	elm_paint = document.getElementsByClassName("j-paint")[0],
	elm_composite = document.getElementsByClassName("j-composite")[0],
	elm_init = document.getElementsByClassName("j-init")[0];

/* 初始化界面 */
function init() {
	var num = 1000,
		node_ul = document.createElement("ul");
	while (num > 0) {
		var node_li = document.createElement("li");
		node_li.innerText = `line ${num}`;
		node_li.style.transform = "translateX(0px)";
		node_ul.insertAdjacentElement("afterBegin", node_li);
		num--;
	}
	// 操作文档
	elm_list.appendChild(node_ul);
	Array.prototype.forEach.call(elm_list.getElementsByTagName("li"), function(
		item
	) {
		translateX(item);
	});

	// 监听 - 多次重新布局按钮
	elm_multipleLayout.addEventListener("click", function(e) {
		var tg = e.target,
			timestamp = null,
			elm_txt = this.getElementsByTagName("span")[0];
		if (tg.tagName !== "BUTTON") return;

		elm_txt.innerText = "";
		timestamp = performance.now();
		multipleLayout();
		timestamp -= performance.now();
		elm_txt.innerText = `${Math.abs(Math.round(timestamp))}ms`;
		tg.disabled = "disabled";
	});

	// 监听 - 一次重新布局按钮
	elm_singleLayout.addEventListener("click", function(e) {
		var tg = e.target,
			timestamp = null,
			elm_txt = this.getElementsByTagName("span")[0];
		if (tg.tagName !== "BUTTON") return;

		elm_txt.innerText = "";
		timestamp = performance.now();
		singleLayout();
		timestamp -= performance.now();
		elm_txt.innerText = `${Math.abs(Math.round(timestamp))}ms`;
		tg.disabled = "disabled";
	});

	// 监听 - 重绘按钮
	elm_paint.addEventListener("click", function(e) {
		var tg = e.target,
			timestamp = null,
			elm_txt = this.getElementsByTagName("span")[0];
		if (tg.tagName !== "BUTTON") return;

		elm_txt.innerText = "";
		timestamp = performance.now();
		paint();
		timestamp -= performance.now();
		elm_txt.innerText = `${Math.abs(Math.round(timestamp))}ms`;
		tg.disabled = "disabled";
	});

	// 监听 - 重新合成按钮
	elm_composite.addEventListener("click", function(e) {
		var tg = e.target,
			timestamp = null,
			elm_txt = this.getElementsByTagName("span")[0];
		if (tg.tagName !== "BUTTON") return;

		elm_txt.innerText = "";
		timestamp = performance.now();
		composite();
		timestamp -= performance.now();
		elm_txt.innerText = `${Math.abs(Math.round(timestamp))}ms`;
		tg.disabled = "disabled";
	});
}

/* 多次重新布局 */
function multipleLayout() {
	var elms_list_li = document.getElementById("list").getElementsByTagName("li");
	Array.prototype.forEach.call(elms_list_li, function(item, index) {
		item.style.opacity = 0.9;
		if (!item.offsetHeight) console.log("");
		item.style = null;
		translateX(item);
	});
}

/* 一次重新布局 */
function singleLayout() {
	var elm_list = document.getElementById("list");
	var elms_list_li = elm_list.getElementsByTagName("li");

	Array.prototype.forEach.call(elms_list_li, function(item, index) {
		item.style.opacity = 0.9;
		item.style = null;
		translateX(item);
	});
	if (!elm_list.offsetHeight) console.log("");
}

/* 重绘 */
function paint() {
	var elms_list_li = document.getElementById("list").getElementsByTagName("li");
	Array.prototype.forEach.call(elms_list_li, function(item, index) {
		item.style.visibility = "none";
		item.style = null;
		translateX(item);
	});
}

/* 重新合成 */
function composite() {
	var elms_list_li = document.getElementById("list").getElementsByTagName("li");
	Array.prototype.forEach.call(elms_list_li, function(item, index) {
		translateX(item);
	});
}

/* 公共业务 - 移动 */
function translateX(elm) {
	elm.style.transform = `
	translateX(${Math.round(Math.random() * 100)}px)
	`;
}

/* 监听 - 初始化按钮 */
elm_init.addEventListener("click", function(e) {
	var tg = e.target,
		timestamp = null,
		elm_txt = this.getElementsByTagName("span")[0];
	if (tg.tagName !== "BUTTON") return;
	elm_txt.innerText = "";
	timestamp = performance.now();
	init();
	timestamp -= performance.now();
	elm_txt.innerText = `${Math.abs(Math.round(timestamp))}ms`;
	this.getElementsByTagName("button")[0].disabled = "disabled";
});
elm_init.getElementsByTagName("button")[0].click();
