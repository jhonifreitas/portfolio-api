export class FirebaseWhere {
  field: string;
  operator: FirebaseFirestore.WhereFilterOp;
  value: string | number | boolean | Date | string[] | number[];

  constructor(
    field: string,
    operator: FirebaseFirestore.WhereFilterOp,
    value: string | number | boolean | Date | string[] | number[]
  ) {
    this.field = field;
    this.value = value;
    this.operator = operator;
  }
}
