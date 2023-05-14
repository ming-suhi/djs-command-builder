import { APIApplicationCommandOptionChoice, ApplicationCommandOptionType, ChannelType } from "discord.js";

abstract class BaseField {
  /**
   * The type of field.
   */
  abstract type: number;
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param required If field is required
   */
  constructor(readonly name: string, readonly description: string, readonly required: boolean = false) { }
}

export interface StringField {
  /**
   * Array of application command option choice
   */
  choices?: APIApplicationCommandOptionChoice<string>[];
  /**
   * Minimum character length
   */
  min_length?: number;
  /**
   * Maximum character length
   */
  max_length?: number;
  /**
   * If autocomplete
   */
  autocomplete?: boolean;
  /**
   * Sets choices property
   * @param choices An array of choices
   */
  setChoices(choices: APIApplicationCommandOptionChoice<string>[]): this;
  /**
   * Sets the min character length for this field
   * @param min_length A number
   */
  setMinLength(min_length: number): this;
  /**
   * Sets the max character lenght for this field
   * @param max_length A number
   */
  setMaxLength(max_length: number): this;
  /**
   * Sets autocomplete to a value for this field
   * @param autocomplete A boolean
   */
  setAutocomplete(autocomplete: Boolean): this;
}

export class StringField extends BaseField { 
  readonly type = ApplicationCommandOptionType.String;
};

export interface IntegerField {
  /**
   * Array of application command option choice
   */
  choices?: APIApplicationCommandOptionChoice<number>[];
  /**
   * Minimum number value
   */
  min_value?: number;
  /**
   * Maximum number value
   */
  max_value?: number;
  /**
   * If autocomplete
   */
  autocomplete?: boolean;
  /**
   * Sets choices property
   * @param choices An array of choices
   */
  setChoices(choices: APIApplicationCommandOptionChoice<number>[]): this;
  /**
   * Sets the min value for this field
   * @param min_value A number
   */
  setMinValue(min_value: number): this;
  /**
   * Sets the max value for this field
   * @param max_value A number
   */
  setMaxValue(max_value: number): this;
  /**
   * Sets autocomplete to a value for this field
   * @param autocomplete A boolean
   */
  setAutocomplete(autocomplete: Boolean): this;
}

export class IntegerField extends BaseField { 
  readonly type = ApplicationCommandOptionType.Integer;
};

export class BooleanField extends BaseField { 
  readonly type = ApplicationCommandOptionType.Boolean;
};

export class UserField extends BaseField { 
  readonly type = ApplicationCommandOptionType.User; 
};

export interface ChannelField {
  /**
   * Allowed channel types
   */
  channel_types?: ChannelType[];
  /**
   * Limits channel inputs to these types
   * @param channel_types An array of channel types
   */
  setChannelTypes(channel_types: ChannelType[]): this;
}

export class ChannelField extends BaseField { 
  readonly type = ApplicationCommandOptionType.Channel;
};

export class RoleField extends BaseField { 
  readonly type = ApplicationCommandOptionType.Role;
};

export class MentionableField extends BaseField { 
  readonly type = ApplicationCommandOptionType.Mentionable;
};

export interface NumberField {
  /**
   * Array of application command option choice
   */
  choices?: APIApplicationCommandOptionChoice<number>[];
  /**
   * Minimum number value
   */
  min_value?: number;
  /**
   * Maximum number value
   */
  max_value?: number;
  /**
   * If autocomplete
   */
  autocomplete?: boolean;
  /**
   * Sets choices property
   * @param choices An array of choices
   */
  setChoices(choices: APIApplicationCommandOptionChoice<number>[]): this;
  /**
   * Sets the min value for this field
   * @param min_value A number
   */
  setMinValue(min_value: number): this;
  /**
   * Sets the max value for this field
   * @param max_value A number
   */
  setMaxValue(max_value: number): this;
  /**
   * Sets autocomplete to a value for this field
   * @param autocomplete A boolean
   */
  setAutocomplete(autocomplete: Boolean): this;
}

export class NumberField extends BaseField { 
  readonly type = ApplicationCommandOptionType.Number;
};

export class AttachmentField extends BaseField { 
  readonly type = ApplicationCommandOptionType.Attachment;
};

// Creates a setter function that is not enumerable
function createSetterProperty<T extends any>(name: string) {
  function setterFunction(this: BaseField, value: T) {
    Object.defineProperty(this, name, { value, enumerable: true, writable: false });
    return this;
  }
  return { value: setterFunction, enumerable: false, writable: false };
}

// Field extra functions
const setChoices = createSetterProperty<APIApplicationCommandOptionChoice[]>("channel_types");
const setChannelTypes = createSetterProperty<ChannelType[]>("channel_types");
const setMinValue = createSetterProperty<number>("min_value");
const setMaxValue = createSetterProperty<number>("max_value");
const setMinLength = createSetterProperty<number>("min_length");
const setMaxLength = createSetterProperty<number>("max_length");
const setAutocomplete = createSetterProperty<Boolean>("autocomplete");

Object.defineProperties(StringField.prototype, { setChoices, setMinLength, setMaxLength, setAutocomplete });
Object.defineProperties(IntegerField.prototype, { setChoices, setMinValue, setMaxValue, setAutocomplete });
Object.defineProperties(ChannelField.prototype, { setChannelTypes });
Object.defineProperties(NumberField.prototype, { setChoices, setMinValue, setMaxValue, setAutocomplete });

/** Field Types */
export type FieldType = StringField | IntegerField | BooleanField | UserField | ChannelField | RoleField | MentionableField | NumberField | AttachmentField;