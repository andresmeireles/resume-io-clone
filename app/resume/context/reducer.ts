import { ResumeActions } from "./actions";
import Resume from "./states";

export enum Actions {
  wantedJob= "wantedJob",
  firstName= "firstName",
  lastName= "lastName",
  email= "email",
  phone= "phone",
  city= "city",
  country= "country",
  address= "address",
  postalCode= "postalCode",
  drivingLicense= "drivingLicense",
  nationality= "nationality",
  placeOfBirth= "placeOfBirth",
  dateOfBirth= "dateOfBirth",
  summary = "summary",
};

export default function reducer(state: Resume, act: ResumeActions): Resume {
  const { value, action } = act;

  switch (action) {
    case Actions.wantedJob:
      return state.copyWith({ wantedJob: value });
    case Actions.firstName:
      return state.copyWith({ firstName: value });
    case Actions.lastName:
      return state.copyWith({ lastName: value });
    case Actions.email:
      return state.copyWith({ email: value });
    case Actions.phone:
      return state.copyWith({ phone: value });
    case Actions.city:
      return state.copyWith({ city: value });
    case Actions.country:
      return state.copyWith({ country: value });
    case Actions.address:
      return state.copyWith({ address: value });
    case Actions.postalCode:
      return state.copyWith({ postalCode: value });
    case Actions.drivingLicense:
      return state.copyWith({ drivingLicense: value });
    case Actions.nationality:
      return state.copyWith({ nationality: value });
    case Actions.placeOfBirth:
      return state.copyWith({ placeOfBirth: value });
    case Actions.dateOfBirth:
      return state.copyWith({ dateOfBirth: value });
    case Actions.summary:
      return state.copyWith({ summary: value });
    case 'employ': {
      console.log("exec employ");
      const s = state.copyWith({ employ: [...value] });
      console.log(s);
      return s;
    }
    case 'education':
      return state.copyWith({ education: [...value] });
    case 'skill':
      return state.copyWith({ skill: [...value] });
    default:
      return state;
  }
}

