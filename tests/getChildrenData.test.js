import { getChildrenData } from "../src/routeBuilder";
import childrenDataDE from "../example/data/custom/de";
import childrenDataEN from "../example/data/custom/en";
import fp from "lodash/fp";

const saveChildrenConfig = {
  path: "/post",
  urlKeyPath: "id",
  templateFile: "src/container/Post",
  propKey: "post",
  dataPath: "example/data/custom"
};

const deChildrenResult = getChildrenData(saveChildrenConfig, {id: "de"});
const enChildrenResult = getChildrenData(saveChildrenConfig, {id: "en"});

test("getChildrenDataDE", () => {
  for(let i = 0; i < deChildrenResult.length; i++) {
    const deChild = deChildrenResult[i];
    expect(deChild.path).toBe(`/post/${fp.get([i, "id"], childrenDataDE)}`);
    expect(deChild.template).toBe(saveChildrenConfig.templateFile);
    expect(deChild.getData()).toEqual({
      locale: "de",
      post: childrenDataDE[i]
    });
  }
});

test("getChildrenDataEN", () => {
  for(let i = 0; i < enChildrenResult.length; i++) {
    const enChild = enChildrenResult[i];
    expect(enChild.path).toBe(`/post/${fp.get([i, "id"], childrenDataEN)}`);
    expect(enChild.template).toBe(saveChildrenConfig.templateFile);
    expect(enChild.getData()).toEqual({
      locale: "en",
      post: childrenDataEN[i]
    });
  }
});
