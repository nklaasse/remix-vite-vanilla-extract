import React from "react";
import type { AppLoadContext, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Form as RemixForm,
  useActionData,
  useLocation,
  useNavigation,
} from "@remix-run/react";

import { conform, useForm } from "@conform-to/react";
import { z } from "zod";

import { useIntl } from "react-intl";

import type { ContactEmailFormStoryblok } from "../component-types-sb";

import { TextField } from "~/components/TextField";
import { Form } from "~/components/Form";
import { Picker } from "~/components/Picker";
import { TextArea } from "~/components/TextArea";
import { Toast, useToastState } from "~/components/Toast";

import { emailFormSection } from "./ContactEmailFormContentType.css";

import type { RichTextType } from "~/utils/richTextForTypography";
import {
  generateForTypography,
  modifyForTypography,
} from "~/utils/richTextForTypography";
import { getConfig, getLocale } from "~/config";
import { parse, parseFieldError } from "~/utils/zodValidation";

export const loader = async (
  storyContent: ContactEmailFormStoryblok,
  _args: LoaderFunctionArgs
) => {
  const {
    sectionTitle,
    formTitle,
    firstName,
    email,
    subject,
    message,
    buttonLabel,
    component,
  } = storyContent;

  const richTextDescription = storyContent.description as RichTextType;
  const description = await modifyForTypography(richTextDescription);

  return {
    props: {
      sectionTitle,
      description,
      formTitle,
      name: firstName[0],
      email: email[0],
      subject: subject[0],
      body: message[0],
      buttonLabel,
    },
    component,
  };
};

const schema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  subject: z.string().min(1),
  body: z.string().min(1),
});

export const action = async (
  request: Request,
  context: AppLoadContext,
  formData: FormData
) => {
  const url = new URL(request.url);
  const locale = getLocale(url.hostname, context);
  const config = getConfig(locale, context);

  const submission = parse(formData, { schema });

  if (!submission.value || submission.intent !== "submit") {
    return json({
      ...submission,
      payload: {
        name: submission.payload.name,
        email: submission.payload.email,
        subject: submission.payload.subject,
        body: submission.payload.body,
      },
      status: 400,
    });
  }

  const res = await fetch(`${context.CVMAKER_API_URL}/helpdesk/ticket`, {
    method: "post",
    body: JSON.stringify(submission.value),
    headers: {
      "Content-Type": "application/json",
      "X-HOST": config.hostname,
    },
  });

  // when there is a server error, redirects to error page
  if (res.status >= 500) {
    throw new Response("Internal Server Error", {
      status: 500,
    });
  }

  return json({
    ...submission,
    payload: {
      name: submission.payload.name,
      email: submission.payload.email,
      subject: submission.payload.subject,
      body: submission.payload.body,
    },
    status: res.status,
  });
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const {
    sectionTitle,
    description,
    formTitle,
    name,
    email,
    subject,
    body,
    buttonLabel,
  } = props.data;

  const location = useLocation();
  const navigation = useNavigation();
  const lastSubmission = useActionData<typeof action>();
  const intl = useIntl();
  const { add: addNotification } = useToastState();

  const isSubmitting = navigation.state === "submitting";

  const showSuccessNotification = lastSubmission?.status === 201;

  const showErrorNotification = lastSubmission
    ? lastSubmission?.status >= 400 && lastSubmission?.status <= 499
    : false;

  const [form, fields] = useForm<z.input<typeof schema>>({
    lastSubmission,
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
    onSubmit(event) {
      if (isSubmitting) {
        event.preventDefault();
      }
    },
  });

  React.useEffect(() => {
    if (isSubmitting) {
      form.ref.current?.reset();
    }
  }, [form.ref, isSubmitting]);

  const generatedDescription = React.useMemo(() => {
    return generateForTypography(description, {
      paragraph: {
        variant: "intro",
      },
    });
  }, [description]);

  return (
    <div className={emailFormSection.content}>
      <div className={emailFormSection.column}>
        <h2 className={emailFormSection.title}>{sectionTitle}</h2>
        <div className={emailFormSection.description}>
          {generatedDescription}
        </div>
      </div>
      <div className={emailFormSection.column}>
        <div className={emailFormSection.shapeContainer}>
          <div className={emailFormSection.shape1}></div>
          <div className={emailFormSection.shape2}></div>
          <div className={emailFormSection.form}>
            <RemixForm method="post" action={location.pathname} {...form.props}>
              <Form>
                <h3 className={emailFormSection.formTitle}>{formTitle}</h3>
                <input
                  type="hidden"
                  name="contentType"
                  value="contactEmailForm"
                />

                <Form.Group>
                  <TextField
                    autoComplete="given-name"
                    isRequired={true}
                    isInvalid={fields.name.error ? true : false}
                    {...conform.input(fields.name, {
                      type: "text",
                    })}
                  >
                    <TextField.Label>{name.label}</TextField.Label>
                    <TextField.Input placeholder={name.placeholder} />
                    {fields.name.error ? (
                      <TextField.ErrorMessage>
                        {parseFieldError(fields.name.error, intl)}
                      </TextField.ErrorMessage>
                    ) : null}
                  </TextField>

                  <TextField
                    autoComplete="email"
                    isRequired={true}
                    isInvalid={fields.email.error ? true : false}
                    {...conform.input(fields.email, {
                      type: "email",
                    })}
                  >
                    <TextField.Label>{email.label}</TextField.Label>
                    <TextField.Input placeholder={email.placeholder} />
                    {fields.email.error ? (
                      <TextField.ErrorMessage>
                        {parseFieldError(fields.email.error, intl)}
                      </TextField.ErrorMessage>
                    ) : null}
                  </TextField>
                </Form.Group>

                <Picker
                  isRequired={true}
                  {...conform.select(fields.subject)}
                  isInvalid={fields.subject.error ? true : false}
                >
                  <Picker.Label>{subject.label}</Picker.Label>
                  <Picker.Select items={subject.items}>
                    {(item) => (
                      <Picker.Item textValue={item.text} key={item.text}>
                        <Picker.Label>{item.text}</Picker.Label>
                      </Picker.Item>
                    )}
                  </Picker.Select>
                  {fields.subject.error ? (
                    <Picker.ErrorMessage>
                      {parseFieldError(fields.subject.error, intl)}
                    </Picker.ErrorMessage>
                  ) : null}
                </Picker>

                <TextArea
                  isRequired={true}
                  isInvalid={fields.body.error ? true : false}
                  {...conform.textarea(fields.body)}
                >
                  <TextArea.Label>{body.label}</TextArea.Label>
                  <TextArea.TextArea rows={5} placeholder={body.placeholder} />
                  {fields.body.error ? (
                    <TextArea.ErrorMessage>
                      {parseFieldError(fields.body.error, intl)}
                    </TextArea.ErrorMessage>
                  ) : null}
                </TextArea>

                <Form.Actions>
                  <Form.Submit>{buttonLabel}</Form.Submit>
                </Form.Actions>

                {showSuccessNotification ? (
                  <>
                    <Toast.Region />
                    {addNotification(
                      <Toast type="success">
                        <Toast.Title>
                          {intl.formatMessage({
                            id: "contentType.emailForm.submitSuccess",
                            defaultMessage:
                              "Your request was successfully submitted!",
                            description:
                              "Success message which is displayed when the request is sent successfully",
                          })}
                        </Toast.Title>
                      </Toast>,
                      { timeout: 10000 }
                    )}
                  </>
                ) : null}

                {showErrorNotification ? (
                  <>
                    <Toast.Region />
                    {addNotification(
                      <Toast type="error">
                        <Toast.Title>
                          {intl.formatMessage({
                            id: "contentType.emailForm.submitError",
                            defaultMessage:
                              "Something went wrong. Please try again later.",
                            description:
                              "Error message which is displayed when the client returns an unexpected error on form submission",
                          })}
                        </Toast.Title>
                      </Toast>,
                      { timeout: 10000 }
                    )}
                  </>
                ) : null}
              </Form>
            </RemixForm>
          </div>
        </div>
      </div>
    </div>
  );
}
