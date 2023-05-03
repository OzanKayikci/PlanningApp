export const shapes = {
   1: "circle" ,
    2:"square",
    3:"triangle",
    4:"rectangle",
    5: "rhombus",
} 

export enum types{
    "parent",
    "list",
    "task",
    "parentTask",
    "project",
}

export enum priorities {
    low="low",
    medium="medium",
    high ="high",
}
export enum ParentTypes{
    task="task",
    list="list",
    project = "project",
}

export enum ModalTypes{
    "taskCreate",
    "listCreate",
    "listDetail",
    "taskDetail",
    "projectDetail",
    "projectCreate",
    "deleteModal",

}


/*//? id <100 ==> PROJECT |  id>=100<200 ==> list | id >=200 ==> task   */