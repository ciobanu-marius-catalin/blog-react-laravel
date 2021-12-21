import { Button, Form } from "react-bootstrap";
import { useReducer, useCallback, useContext } from "react";
import _ from "lodash";
import { useDeepCallback, useDeepMemo } from "@/core";
import { CrudContext, useCrudContext } from "./crud-context";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CrudForm_ = (props) => {
    console.log("crud form");
    const { settings = [], method = "post" } = props;
    const { apiPath } = useContext(CrudContext);
    const history = useHistory();
    const [formData, setFormData] = useReducer((state, action) => {
        return _.merge({}, state, action);
    }, {});
    const getValue = useDeepCallback(
        (path, defaultValue) => {
            return _.get(formData, path, defaultValue);
        },
        [formData]
    );
    const setValue = useDeepCallback(
        (path) => (newValue) => {
            let data = _.get(newValue, ["target", "value"]);
            let changes = _.set({}, path, data);
            setFormData(changes);
        },
        [formData, setFormData]
    );

    const settingsWithData = useDeepMemo(() => {
        return settings.map((item = {}) => {
            const setting = item?.setting;
            return _.merge({}, item, {
                value: getValue(setting),
                onChange: setValue(setting),
            });
        });
    }, [settings, formData, setValue]);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("on submit");
        let path = `${apiPath}`;
        try {
            let response = await axios({
                method: method,
                url: path,
                data: formData,
            });
            history.push(apiPath);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="gravity-crud-form__container">
            Add user
            <Form>
                {settingsWithData.map(
                    ({ label, type, ...props } = {}, index) => (
                        <Form.Group key={index} className="mb-3">
                            <Form.Label>{label}</Form.Label>
                            <Form.Control type={type} {...props}></Form.Control>
                        </Form.Group>
                    )
                )}

                <Button onClick={onSubmit}>Save</Button>
            </Form>
        </div>
    );
};

const CrudForm = (props) => {
    const { localApiPath } = props;
    const contextValue = useCrudContext(localApiPath);
    return (
        <CrudContext.Provider value={contextValue}>
            <CrudForm_ {...props} />
        </CrudContext.Provider>
    );
};

export { CrudForm };
