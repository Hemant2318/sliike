import { icons } from "utils/constants";
import TextInput from "../TextInput";
import RadioButton from "../RadioButton";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import EmojiPicker from "../EmojiPicker";
import { useDispatch } from "react-redux";
import {
  gistCreate,
  responseGist,
  throwError,
  throwSuccess,
} from "store/globalSlice";
import { objectToFormData } from "utils/helpers";
import { useParams } from "react-router-dom";
import { isEmpty, omit } from "lodash";
import MicRecorder from "mic-recorder-to-mp3";
import "./PostInput.scss";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const PostInput = ({
  label,
  handelSuccess,
  handleSuccessReplay,
  setIsSuccess,
  myGist,
  myGistSuccess,
}) => {
  const params = useParams();
  const isCreate = isEmpty(params);
  const formRef = useRef();
  const dispatch = useDispatch();
  const [messageValue, setMessageValue] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blobURLLink, setBlobURLLink] = useState("");
  const initialValues = {
    gistId: params?.id,
    isBlob: blobURLLink ? true : false,
    isCreate: isEmpty(params),
    senderType: "superAdmin",
    type: "everyone",
    title: "",
    message: "",
    audioFile: "",
    member_type: "superAdmin",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.lazy((_, o) => {
      const { isCreate } = o?.parent;
      if (isCreate) {
        return Yup.string().required("Title is required.");
      } else {
        return Yup.string();
      }
    }),
    message: Yup.lazy((_, o) => {
      const { audioFile, isCreate } = o?.parent;
      if (audioFile || !isCreate) {
        return Yup.string();
      } else {
        return Yup.string().required("Message is required.");
      }
    }),
    // message: Yup.string().required("Message is required."),
  });

  const handleSend = async (values) => {
    if (isCreate) {
      handleCreate(values);
    } else {
      handleReplay(values);
    }
  };

  const handleReplay = async (values) => {
    const payload = omit(values, [
      "isCreate",
      "isBlob",
      "title",
      "member_type",
      "type",
    ]);
    const formData = objectToFormData(blobURLLink ? values : payload);
    const response = await dispatch(responseGist(formData));
    if (response?.status === 200) {
      if (formRef.current) {
        formRef.current.resetForm();
      }
      dispatch(throwSuccess(response?.message));
      handleSuccessReplay();
    } else {
      dispatch(throwError(response?.message));
    }
  };

  const handleCreate = async (values) => {
    const payload = omit(values, [
      "isCreate",
      "isBlob",
      "senderType",
      "gistId",
    ]);
    const formData = objectToFormData(blobURLLink ? values : payload);
    const response = await dispatch(gistCreate(formData));
    if (response?.status === 200) {
      if (formRef.current) {
        formRef.current.resetForm();
      }
      dispatch(throwSuccess(response?.message));
      if (myGist) {
        myGistSuccess();
        setIsSuccess(true);
      } else {
        handelSuccess();
      }
      setBlobURLLink("");
    } else {
      dispatch(throwError(response?.message));
    }
  };

  const startHandle = () => {
    if (isBlocked) {
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };
  const stopHandle = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        // const url = URL.createObjectURL(blob);
        // formRef?.current?.setFieldValue("audioFile", blob);
        const data = formRef?.current?.values;
        setBlobURLLink(blob);
        if (isCreate) {
          const payload = omit(data, [
            "gistId",
            "isCreate",
            "isBlob",
            "senderType",
            "message",
          ]);
          const newPayload = { ...payload, audioFile: blob };
          handleCreate(newPayload);
        } else {
          const replayPayload = omit(data, [
            "isCreate",
            "isBlob",
            "title",
            "member_type",
            "type",
          ]);
          const newReplayPayload = { ...replayPayload, audioFile: blob };

          handleReplay(newReplayPayload);
        }

        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    navigator?.getUserMedia(
      { audio: true },
      () => {
        setIsBlocked(false);
      },
      () => {
        setIsBlocked(true);
      }
    );
  }, []);
  return (
    <div id="post-input-container">
      <div className="text-17-700 color-black-2 text-center cmb-24">
        {isCreate && label}
      </div>
      {
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSend}
        >
          {(props) => {
            const {
              values,
              errors,
              handleChange,
              handleSubmit,
              setFieldValue,
            } = props;
            const { title, message, type } = values;

            return (
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
              >
                {isCreate && (
                  <>
                    <div className="radio-container d-flex gap-3 cmb-24 flex-wrap">
                      <RadioButton
                        label="For Everyone"
                        id={type}
                        value={type}
                        checked={type === "everyone"}
                        onChange={() => {
                          setFieldValue("type", "everyone");
                        }}
                      />
                      <RadioButton
                        label="For Beautician Only"
                        id={type}
                        value={type}
                        checked={type === "beauticianOnly"}
                        onChange={() => {
                          setFieldValue("type", "beauticianOnly");
                        }}
                      />
                    </div>
                    <div className="cmb-24">
                      <TextInput
                        id="title"
                        label="Title"
                        value={title}
                        error={errors?.title}
                        placeholder="Add title"
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
                {!isCreate && (
                  <div className="text-15-500 color-black-2 cmb-15">
                    Replay gist
                  </div>
                )}
                <div className="d-flex gap-2 align-items-center">
                  <div className="flex-grow-1 gist-input">
                    <EmojiPicker
                      onChange={(e) => {
                        let newMessage = `${message} ${e?.value}`;
                        setFieldValue("message", newMessage);
                      }}
                    />
                    <input
                      id="message"
                      type="text"
                      placeholder="Add message"
                      value={message}
                      onChange={(e) => {
                        handleChange(e);
                        setMessageValue(e.target.value);
                      }}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    {messageValue && (
                      <div>
                        <img
                          src={messageValue ? icons.sendIcon : icons.voiceIcon}
                          alt="record"
                          className={messageValue && "pointer"}
                          onClick={() => {
                            if (messageValue) {
                              handleSubmit();
                            }
                          }}
                        />
                      </div>
                    )}
                    {!messageValue && (
                      <div>
                        <img
                          src={isRecording ? icons.voicePause : icons.voiceIcon}
                          alt="record"
                          className={isCreate ? title && "pointer" : "pointer"}
                          onClick={() => {
                            if (isRecording) {
                              stopHandle();
                              setFieldValue("audioFile", blobURLLink);
                            } else {
                              startHandle();
                            }
                          }}
                        />
                      </div>
                    )}
                    {/* <div>
                      <img
                        src={messageValue ? icons.sendIcon : icons.voiceIcon}
                        alt="record"
                        className={messageValue && "pointer"}
                        onClick={() => {
                          if (messageValue) {
                            handleSubmit();
                          }
                          // else {
                          //   if (isRecording) {
                          //     console.log("stop");
                          //   } else {
                          //     console.log("start");
                          //   }
                          //   // startHandle();
                          // }
                        }}
                      />
                    </div> */}
                  </div>
                </div>
                {errors?.message && (
                  <span className="text-13-500 pt-1">
                    <span style={{ color: "red" }}>{errors?.message}</span>
                  </span>
                )}
              </form>
            );
          }}
        </Formik>
      }
    </div>
  );
};
export default PostInput;
