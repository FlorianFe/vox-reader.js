import { isArray } from "lodash";
import { VoxNode, VoxStructure } from "../../types/types";

type Node = {
  id: string;
  data: any;
  children: Array<Node>;
};

type Result = {
  [key: string]: any;
};

const removeRiffStructure = (riffObject: VoxNode) => {
  let result: Result = {};

  riffObject.children.forEach((child: Node) => {
    const key = child.id.toLowerCase();

    if (result[key] != undefined) {
      if (isArray(result[key])) {
        result[key].push(removeRiffStructure(child));
      } else {
        result[key] = [result[key], removeRiffStructure(child)];
      }
    } else {
      result[key] = removeRiffStructure(child);
    }
  });

  Object.entries(riffObject.data).forEach(([key, value]) => {
    result[key] = value;
  });

  return result as VoxStructure;
};

export = removeRiffStructure;
