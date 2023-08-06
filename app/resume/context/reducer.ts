import { Actions, ResumeActions } from "./actions";
import Resume from "./states";

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
    case "employ":
      return state.copyWith({ employ: [...value] });
    case "education":
      return state.copyWith({ education: [...value] });
    case "skill":
      return state.copyWith({ skill: [...value] });
    case "social":
      return state.copyWith({ social: [...value] });
    default:
      return state;
  }
}
