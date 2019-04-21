import { getCustomData } from "../src/routeBuilder";
import customDataDE from "../example/data/custom/de";
import customDataEN from "../example/data/custom/en";

const saveCustomConfig = {
	propKey: "custom",
	dataPath: "example/data/custom"
};

test("getCustomDataDE", () => {
	expect(getCustomData(saveCustomConfig, {id: "de"})).toEqual(
    {custom: customDataDE, locale: "de"}
	);
});

test("getCustomDataEN", () => {
  expect(getCustomData(saveCustomConfig, {id: "en"})).toEqual(
    {custom: customDataEN, locale: "en"}
  );
});
