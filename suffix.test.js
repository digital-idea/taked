"use strict"

import * as assert from "assert";

import { incSuffix } from "./suffix.js";

describe("suffix.js", function() {
	var cases = [
		{s: "A001", want: "A002"},
		{s: "A009", want: "A010"},
		{s: "A099", want: "A100"},
		{s: "A999", want: "A1000"},
		{s: "D31c", want: "D31d"},
		{s: "1A", want: "1B"},
		{s: "1Z", want: "1A"}, // 2A가 아님.
		{s: "1a", want: "1b"},
		{s: "1z", want: "1a"}, // 2a가 아님.
		{s: "a-1", want: "a-2"},
	];

	cases.forEach(function(c) {
		var got = incSuffix(c.s);
		it("incSuffix(" + c.s + ")", function() {
			assert.equal(got, c.want);
		});
	});
});

